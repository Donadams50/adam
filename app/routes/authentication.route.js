module.exports = app => {
    const authentication = require("../controllers/authentication");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const validation = require('../middlewares/authentication')
    const { verifyToken, isAdmin} = jwtTokenUtils;
    const {login} = authentication
    const { loginValidation} = validation

    app.post("/login", loginValidation,  login)

    
}

          
 