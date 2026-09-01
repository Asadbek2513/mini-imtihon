const Joi = require("joi");

const studentValidation = Joi.object({
    lid_id: Joi.string().hex(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().pattern(/^\+998\d{9}$/).required(),
    birthday: Joi.date(),
    gender: Joi.string().required()
});

module.exports = { studentValidation };