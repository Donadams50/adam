const Joi = require('@hapi/joi')
const validationRules= require('../helpers/validationRules')
const joiValidator = require('../helpers/joiValidator')
exports.todoValidation = async(req,res,next)=>{
    const todoSchema = Joi.object().keys({
        title: validationRules.title,
        description: validationRules.description,
    });
    
    const errors = joiValidator(req.body, todoSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}

exports.idValidation = async(req,res,next)=>{
    const idSchema = Joi.object().keys({
        id : validationRules.title
    });
    
    const errors = joiValidator(req.params, idSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}

exports.queryValidation = async(req,res,next)=>{
    if(req.query.isCompleted){req.query.isCompleted = req.query.isCompleted.toLowerCase()}
    const statusSchema =  Joi.object().keys({
        isCompleted: validationRules.isCompleted,
        from_date: validationRules.from_date,
        to_date: validationRules.to_date
        
    }).and('from_date', 'to_date');  
    
    const errors = joiValidator(req.query, statusSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
    
}