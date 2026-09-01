const Joi = require("joi");

const paymentValidation = Joi.object({
    student_id: Joi.string().hex().required(),
    payment_last_date: Joi.date().required(),
    payment_date: Joi.date().default(Date.now),
    price: Joi.number().required(),
    is_paid: Joi.boolean().default(true),
    total_attent: Joi.number().default(0)
});

module.exports = { paymentValidation };