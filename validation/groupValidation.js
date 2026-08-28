const Joi = require("joi");

const groupValidationSchema = Joi.object({
    group_name: Joi.string().trim().required(),
    lesson_start_time: Joi.string().required(),
    lesson_end_time: Joi.string().required(),
    lesson_days: Joi.string().trim().optional(),
    room_number: Joi.string().required(),
    branch: Joi.string().trim().required(),
    teacher_name: Joi.string().trim().required()
});

const updateGroupValidationSchema = Joi.object({
    group_name: Joi.string().trim().optional(),
    lesson_start_time: Joi.string().optional(),
    lesson_end_time: Joi.string().optional(),
    lesson_days: Joi.array().items(Joi.string()).optional(),
    room_number: Joi.string().optional(),
    branch: Joi.string().trim().optional(),
    teacher_name: Joi.string().trim().optional(),
    is_active: Joi.boolean().optional()
});

module.exports = {
    groupValidationSchema,
    updateGroupValidationSchema
};