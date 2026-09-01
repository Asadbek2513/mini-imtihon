const Joi = require("joi");

const stuff_roleValidation = Joi.object({
    stuff_id: Joi.string().hex().required(),
    role_id: Joi.string().hex().required()
});

module.exports = { stuff_roleValidation };