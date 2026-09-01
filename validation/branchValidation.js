const Joi = require("joi");

const branchValidation = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    call_number: Joi.string().required()
});

module.exports = { branchValidation };