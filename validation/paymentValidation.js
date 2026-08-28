const Joi = require("joi");

const paymentValidationSchema = Joi.object({
    student_id: Joi.string().hex().required(),
    amount: Joi.number().positive().required(),
    payment_type: Joi.string().valid().required(),
    collected_by: Joi.string().trim().required()
});

module.exports = { paymentValidationSchema };