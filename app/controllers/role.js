const Role = require("../models/role");
const dotenv = require("dotenv");
dotenv.config();

//create new role
exports.createRole = async (req, res) => {
  const { role } = req.body;
  try {
    const getRole = await Role.findOne({ role: role });
    if (getRole) {
      res.status(409).send({ status:409, message: "Role Already exist" });
    } else {
      const roles = new Role({
        role: role,
      });
      const saveRole = await roles.save();
      res.status(201).send({ status:201, message: "Role created", data: saveRole });
    }
  } catch (err) {
      res.status(500).send({ status:500, message: "Error while creating role " });
  }
};

// Find all roles
exports.getRoles = async (req, res) => {
  try {
    const findAllRoles = await Role.find().sort({ _id: -1 });
    res.status(200).send({status:200, message: "Roles Fetched", data: findAllRoles });
  } catch (err) {
    console.log(err);
    res.status(500).send({status:500, message: "Error while getting all roles " });
  }
};

//update a single role
exports.updateRole = async (req, res) => {
  const _id = req.params.roleId;
  const { role } = req.body;

  const roles = new Role({
    _id: _id,
    role: role,
  });

  try {
    const updateRole = await Role.updateOne({ _id }, roles);
    res.status(200).send({ status:200, message: "Updated succesfully", data: updateRole });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status:500, message: "Error while updating role " });
  }
};



// Find  role by id
exports.getRoleById = async (req, res) => {
  const roleId = req.params.roleId
  try {
    const findRole = await Role.findOne({_id: roleId}).sort({ _id: -1 });
    res.status(200).send({status:200, message: "Role Fetched", data: findRole });
  } catch (err) {
    console.log(err);
    res.status(500).send({status:500, message: "Error while getting role" });
  }
};
