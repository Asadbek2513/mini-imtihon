const Joi = require("joi");

const lessonValidation = Joi.object({
    lesson_theme: Joi.string().trim().required(),
    lesson_number: Joi.number().required(),
    group_id: Joi.string().hex().required(),
    lesson_date: Joi.string().required()
});

module.exports = { lessonValidation };