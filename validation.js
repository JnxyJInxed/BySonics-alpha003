//validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
	const schema = Joi.object({
	    name : Joi.string().min(6).required(),
	    email : Joi.string().min(6).required().email(),
	    password : Joi.string().min(6).required()
	})
    //Validate input sebelum register
    return schema.validate(data);
}

//Lopgin Validation
const loginValidation = data => {
	const schema = Joi.object({
	    email : Joi.string().min(6).required().email(),
	    password : Joi.string().min(6).required()
	})
    //Validate input sebelum register
    return schema.validate(data);
}

//export module
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;