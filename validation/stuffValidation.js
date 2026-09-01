const Joi = require("joi");

const stuffValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    login: Joi.string().required(),
    parol: Joi.string().required(),
    is_active: Joi.boolean().default(true)
});

module.exports = { stuffValidation };