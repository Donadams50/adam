const Joi = require('@hapi/joi')
const validationRules= require('../helpers/validationRules')
const joiValidator = require('../helpers/joiValidator')

exports.loginValidation = async(req,res,next)=>{
    const loginSchema = Joi.object().keys({
        userId: validationRules.stringValidationRequired,
        password : validationRules.stringValidationRequired
    });
    
    const errors = joiValidator(req.body, loginSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}







