const Users = require("../models/user");
const Auths = require("../models/authentication");
const Codes = require("../models/token");
const passwordUtils =require('../helpers/passwordUtils');
const jwtTokenUtils = require('../helpers/jwtTokenUtils.js');
const sendemail = require('../helpers/emailhelper.js');
const uuid = require('uuid')
const dotenv=require('dotenv');
dotenv.config();
const { signToken } = jwtTokenUtils



exports.login = async(req, res) => {
    const userId = req.body.userId.toLowerCase()
    const password = req.body.password
    try{
        const User = await Users.findOne({email: userId}).populate('role');
        const Auth = await Auths.findOne({userId: userId} )
        if(User && Auth){
            const retrievedPassword = Auth.password
            const id = User._id;
            const {  firstName,   lastName, phoneNumber , email, isVerified, isActive, isDeleted,role} = User
            const isMatch = await passwordUtils.comparePassword( password, retrievedPassword);
            console.log(isMatch )
            if(isMatch){
                if(User.isActive === false){
                    res.status(400).json({ status:400, message:"Your account has been disabled contact the admin to enable your account"})
                }else{ 
                    const tokens = signToken( id, firstName, lastName, phoneNumber , email, isVerified, isActive, isDeleted,  role) 
                    
                    profile = { id,firstName, lastName, phoneNumber , email, isVerified, isActive, isDeleted, role} 
                                  
                    res.status(200).send({ status:200, message:"Login Successful", data : {userDetails: profile, token:tokens }})  
                }  
                            
            }else{
                res.status(400).json({status:400, message:"Incorrect Login Details"})
            }                      
        }else{
            res.status(400).send({status:400,message:"Incorrect Login Detailss"})
        }
                     
              
    }catch(err){
        console.log(err)
        res.status(500).send({status:500, message:"Error while signing in "})
    }
};

