const Joi = require("joi");

const lid_statusValiodation = Joi.object({
    status: Joi.string().required()
});

module.exports = { lid_statusValiodation };