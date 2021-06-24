const Joi = require('@hapi/joi')
const validationRules= require('../helpers/validationRules')
const joiValidator = require('../helpers/joiValidator')

exports.roleValidation = async(req,res,next)=>{
    const roleSchema = Joi.object().keys({
        role: validationRules.stringValidationRequired,
    
       
    });
    
    const errors = joiValidator(req.body, roleSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}



