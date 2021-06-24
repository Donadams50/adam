module.exports = app => {
    const user = require("../controllers/user");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const validation = require('../middlewares/user')
    const { verifyToken, isAdmin} = jwtTokenUtils;
    const {createUser, getAllUsers, getUserById, updateUser, activateUser, deactivateUser} = user
    const {userValidation, updateUserValidation} = validation
    
    app.post("/user", userValidation,    createUser)
    app.get("/users", verifyToken, isAdmin,   getAllUsers)
    app.get("/users/:userId", verifyToken,   getUserById)
    app.put("/users/:userId", updateUserValidation, verifyToken, updateUser)
    app.get("/deactivateUser/:userId", verifyToken, isAdmin, deactivateUser)
    app.get("/activateUser/:userId", verifyToken, isAdmin ,   activateUser)
}

          
