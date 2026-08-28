const Joi = require("joi");

const lessonValidationSchema = Joi.object({
    group_name: Joi.string().trim().required(),
    lesson_title: Joi.string().trim().required(),
    lesson_date: Joi.string().required(),
    stage_name: Joi.string().trim().required()
});

const attendanceValidationSchema = Joi.object({
    student_id: Joi.string().hex().length(24).required(),
    lesson_id: Joi.string().hex().length(24).required(),
    is_present: Joi.boolean().optional(),
    score: Joi.number().min(0).max(100).optional()
});

module.exports = {
    lessonValidationSchema, 
    attendanceValidationSchema
};