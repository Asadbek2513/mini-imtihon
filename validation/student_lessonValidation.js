const Joi = require("joi");

const student_lessonValidation = Joi.object({
    lesson_id: Joi.string().hex().required(),
    student_id: Joi.string().hex().required(),
    is_there: Joi.boolean().default(false),
    reason: Joi.string().allow(""),
    be_paid: Joi.boolean().default(false)
});

module.exports = { student_lessonValidation };