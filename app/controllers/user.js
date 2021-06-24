const Users = require("../models/user");
const Auths = require("../models/authentication");
const Codes = require("../models/token");
const Role = require("../models/role");
const passwordUtils =require('../helpers/passwordUtils');
const jwtTokenUtils = require('../helpers/jwtTokenUtils.js');
const sendemail = require('../helpers/emailhelper.js');
const mongoose = require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

//add new user
exports.createUser = async (req, res) => {
    const { role, firstName, lastName, phoneNumber,  password } = req.body;
    const email = req.body.email.toLowerCase();
    const harshedpassword = await passwordUtils.hashPassword(password);
    try {
      const isUserExist = await Users.findOne({$or:[ {'email':email}, {'phoneNumber':phoneNumber} ]});
      if (isUserExist) {
        res.status(409).send({ status:409, message: "User Already exist" });
      } else {
        const codeGenerated =  getCode();
        const users = new Users({
          role: role,
          firstName:firstName,
          lastName: lastName,
          email: email,
          phoneNumber : phoneNumber,
          isActive: true,
          isVerified : false,
          isDeleted : false

        });
        const auths = new Auths({ 
            userId: email ,
            password : harshedpassword          
        });
    
     
        const saveUser = await users.save();
        const saveauth = await  auths.save();
        const codes = new Codes({ 
          userId: saveUser._id ,
          code : codeGenerated          
      });
        const saveCode = await codes.save(); 
        const emailFrom = process.env.user 
        const subject = 'Verification link';                      
        const hostUrl = ""+process.env.hostUrl+"/verifyemail/"+codeGenerated+""
        const hostUrl2 = ""+process.env.hostUrl2+"/verifyemail/"+codeGenerated+"" 
        const Name =firstName
        const   text = 'Welcome to Lastma app, verify your account by clicking the link below'
        const emailTo = email;
                                           
        sendemail.emailUtility(emailFrom, emailTo, subject, hostUrl, hostUrl2, text, Name);
        res.status(201).send({status:201, message: "User created", data: saveUser });
      }
    } catch (err) {
      console.log(err)
        res.status(500).send({status:500, message: "Error while creating user " });
    }
  };
 
 // Find all users
exports.getUserById = async (req, res) => {
  userId = req.params.userId
  try{
    const findUser = await Users.findOne({_id :userId}).sort({ _id: -1 }).populate('role');

    res.status(200).send({ status:200, message: "User Fetched", data: findUser });

    res.status(200).send({ message: "User Fetched", data: findUser });

  }catch(err){
    console.log(err);
    res.status(500).send({ status:500, message: "Error while getting user " });
  }
};

//update user
exports.updateUser = async (req, res) => {
  const _id = req.params.userId;
  const { role, firstName,  lastName, phoneNumber, isActive, isVerified , isDeleted} = req.body;
  const users = new Users({
    _id: _id,
    role: role,
    firstName:firstName,
    lastName: lastName,
    phoneNumber : phoneNumber,
    isActive: isActive,
    isVerified : isVerified,
    isDeleted : isDeleted
  });

  try {
    const updateUser = await Users.updateOne({ _id }, users);
    res.status(200).send({ status:200, message: "Updated succesfully", data: updateUser });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status:500, message: "Error while updating user " });
  }
};

// get all users
exports.getAllUsers = async(req,res)=>{
  try{

      if(req.query.role){
        const getroles = await Role.findOne({role :req.query.role})
        req.query.role = getroles._id
      }


      const query = await getQuery({...req.query})
      const users = await Users.find(query).populate('role').sort({"_id": -1})
      return res.status(200).send({status:200, message:'Users fetched successfully', data:users})
  }catch (error){
      console.log(error)
      return res.status(500).send({status:500, message:'Oops! An error occured', data:error})
  }
}


//De activate user
exports.deactivateUser = async (req, res) => {
  const userId = req.params.userId; 
  try{
      const isUserExist = await Users.findOne({_id: userId})
      if(isUserExist){                              
          const _id =  isUserExist._id
          const enableUser = await Users.findOneAndUpdate({ _id}, { isActive: false });
          if(enableUser){
              res.status(200).send({ status:200, message:"User Deactivated succesfully", data:null})
          }else{
              res.status(400).send({ status:400, message:" Error while Deactivating user "})
          }                                                                           
      }else{
          res.status(400).send({ status:400, message:"Invalid user"})
      }

  }catch(err){
      console.log(err)
      res.status(500).send({ status:500, message:"Error while activating user "})
  }                 
};          

// Activate user
exports.activateUser = async (req, res) => {
  const userId = req.params.userId; 
  try{
      const isUserExist = await Users.findOne({_id: userId})
      if(isUserExist){                              
          const _id =  isUserExist._id
          const enableUser = await Users.findOneAndUpdate({ _id}, { isActive: true });
          if(enableUser){
              res.status(200).send({ status:200,message:"User Activated succesfully", data:null})
          }else{
              res.status(400).send({ status:400, message:" Error while activating user "})
          }                                                                           
      }else{
          res.status(400).send({ status:400, message:"  Invalid user"})
      }

  }catch(err){
      console.log(err)
      res.status(500).send({ status:500, message:"Error while activating user "})
  }                 
};    

 function getCode(){
    var numbers = "0123456789";

    var chars= "abcdefghijklmnopqrstuvwxyz";
  
    var code_length = 6;
    var number_count = 3;
    var letter_count = 3;
  
    var code = '';
  
    for(var i=0; i < code_length; i++) {
       var letterOrNumber = Math.floor(Math.random() * 2);
       if((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
          letter_count--;
          var rnum = Math.floor(Math.random() * chars.length);
          code += chars[rnum];
       }
       else {
          number_count--;
          var rnum2 = Math.floor(Math.random() * numbers.length);
          code += numbers[rnum2];
       }
    }
return code
}

const getQuery = (queryObj) =>{
 
  const {  isActive={ $in: [ true, false ] }, isDeleted={ $in: [ true, false ] }} = queryObj

  const query = {isDeleted:isDeleted, isActive:isActive }

  return query
} 






 function getCode(){
    var numbers = "0123456789";

    var chars= "abcdefghijklmnopqrstuvwxyz";
  
    var code_length = 6;
    var number_count = 3;
    var letter_count = 3;
  
    var code = '';
  
    for(var i=0; i < code_length; i++) {
       var letterOrNumber = Math.floor(Math.random() * 2);
       if((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
          letter_count--;
          var rnum = Math.floor(Math.random() * chars.length);
          code += chars[rnum];
       }
       else {
          number_count--;
          var rnum2 = Math.floor(Math.random() * numbers.length);
          code += numbers[rnum2];
       }
    }
return code
}

            

            
            