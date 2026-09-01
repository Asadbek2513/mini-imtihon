const Joi = require("joi");

const student_groupValidation = Joi.object({
    student_id: Joi.string().hex().required(),
    group_id: Joi.string().hex().required()
});

module.exports = { student_groupValidation };