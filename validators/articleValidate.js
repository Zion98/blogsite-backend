const Joi = require("joi");

const articleValidate = {
    fullname: Joi.string().required(),
    facebook: Joi.string().required(),
    twitter: Joi.string().required(),
    data: Joi.string().required(),
};

module.exports = {
    articleValidate
}