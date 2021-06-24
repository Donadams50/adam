const Joi = require('@hapi/joi')
const validationRules= require('../helpers/validationRules')
const joiValidator = require('../helpers/joiValidator')

// create user validation
exports.userValidation = async(req,res,next)=>{
    const userSchema = Joi.object().keys({
        role: validationRules.stringValidationRequired,
        firstName : validationRules.stringValidationRequired,
        lastName: validationRules.stringValidationRequired,
        email : validationRules.email,
        phoneNumber: validationRules.phone,
        isActive : validationRules.booleanValidation,
        isVerified: validationRules.booleanValidation,
        isDeleted : validationRules.booleanValidation,
       // addedBy : validationRules.stringValidationRequired
       password : validationRules.stringValidationRequired
    });
    
    const errors = joiValidator(req.body, userSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}

// update user validation
exports.updateUserValidation = async(req,res,next)=>{
    const updateUserSchema = Joi.object().keys({
        role: validationRules.arrayStringValidationRequired,
        firstName : validationRules.stringValidationRequired,
        lastName: validationRules.stringValidationRequired,
        phoneNumber: validationRules.phone,
        isActive : validationRules.booleanValidationRequired,
        isVerified: validationRules.booleanValidationRequired,
        isDeleted : validationRules.booleanValidationRequired,
       // addedBy : validationRules.stringValidationRequired
       
    });
    
    const errors = joiValidator(req.body, updateUserSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}


