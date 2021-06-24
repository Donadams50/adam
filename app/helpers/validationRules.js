const Joi = require('@hapi/joi')

const validationRules = {
    stringValidation: Joi.string().required().trim().min(3),
    stringLenghtValidation: Joi.string().trim().min(3),
    stringValidationRequired: Joi.string().required(),
    stringValidationNotRequired: Joi.string(),
    otp: Joi.string().required().trim().min(4),
    booleanValidation: Joi.string().trim().min(3).valid(true, false),
    booleanValidationRequired : Joi.string().trim().min(3).valid(true, false).required(),
    email: Joi.string().email().required(),
    amount: Joi.string().required().regex(/^\d+$/).trim().min(3).required(),
    phone: Joi.string().trim().regex(/(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/).required(),
    amount2: Joi.number().integer().required(),
    phone2: Joi.string().trim().regex(/(^[\+]?[234]\d{12}$)/),
    from_date: Joi.date().min('1-1-2020').iso(),
    to_date: Joi.date().min('1-1-2020').iso(),
    arrayStringValidationRequired :Joi.array().items(Joi.string()).required(),

    arrayStringValidation :Joi.array().items(Joi.string()),  
    arrayStringValidation :Joi.array().items(Joi.string()),
    OffenderValidationRequired : Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            phoneNumber: Joi.string().trim().regex(/(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/).required(),
            userIdentification: Joi.array().items(Joi.object({userIdentificationType: Joi.string().required(), userIdentificationNumber: Joi.string().required() }).required()),
            
       
    })    

}


module.exports = validationRules