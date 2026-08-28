const Joi = require("joi");

const studentValidationSchema = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    phone: Joi.string().pattern(/^\+998\d{9}$/).required(),
    email: Joi.string().allow("").optional(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid("male", "female").required()
});

const updateStudentValidationSchema = Joi.object({
    first_name: Joi.string().trim().optional(),
    last_name: Joi.string().trim().optional(),
    phone: Joi.string().pattern(/^\+998\d{9}$/).optional(),
    email: Joi.string().email().allow("").optional(),
    password: Joi.string().min(6).optional(),
    gender: Joi.string().valid("male", "female").optional(),
    is_active: Joi.boolean().optional()
});

module.exports = {
    studentValidationSchema,
    updateStudentValidationSchema
};