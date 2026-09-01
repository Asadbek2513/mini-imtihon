const Joi = require("joi");

const group_stuffValidation = Joi.object({
    group_id: Joi.string().hex().length(24).required(),
    stuff_id: Joi.string().hex().length(24).required()
});

module.exports = { group_stuffValidation };