const Joi = require("joi");

const signUpValidate = {
    firstname: Joi.string().required(),
    lastname: Joi.string().email(),
    email: Joi.string().required(),
    password: Joi.string().required(),
};

module.exports = {
    signUpValidate
}