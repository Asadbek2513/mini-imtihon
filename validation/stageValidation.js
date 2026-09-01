const Joi = require("joi");

const stageValidation = Joi.object({
    name: Joi.string().required()
});

module.exports = { stageValidation };