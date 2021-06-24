module.exports = app => {
    const role = require("../controllers/role");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const validation = require('../middlewares/role')
    const { verifyToken} = jwtTokenUtils;
    const {createRole, getRoles, updateRole, getRoleById} = role
    const {roleValidation} = validation
    
    app.post("/role", verifyToken,  roleValidation, createRole)
    app.get("/roles",   getRoles)
    app.put("/roles/:roleId", verifyToken, roleValidation,  updateRole)
    app.get("/roles/:roleId",  verifyToken, getRoleById)
   
     
}

          
