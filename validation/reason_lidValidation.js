const Joi = require("joi");

const reason_lidValidation = Joi.object({
    reason_lid: Joi.string().required()
});

module.exports = { reason_lidValidation };