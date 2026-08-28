const Joi = require("joi");

const lidValidationSchema = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    phone: Joi.string().pattern(/^\+998\d{9}$/).required(),
    status: Joi.string().trim().optional(),
    reason: Joi.string().trim().allow("").optional(),
    branch: Joi.string().trim().required(),
    created_by: Joi.string().trim().required(),
    description: Joi.string().trim().allow("").optional()
});

const updateLidValidationSchema = Joi.object({
    first_name: Joi.string().trim().optional(),
    last_name: Joi.string().trim().optional(),
    phone: Joi.string().pattern(/^\+998\d{9}$/).optional(),
    status: Joi.string().trim().optional(),
    reason: Joi.string().trim().allow("").optional(),
    branch: Joi.string().trim().optional(),
    created_by: Joi.string().trim().optional(),
    description: Joi.string().trim().allow("").optional()
});

module.exports = {
    lidValidationSchema,
    updateLidValidationSchema
};