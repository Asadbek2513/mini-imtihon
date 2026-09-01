const Joi = require("joi");

const groupValidation = Joi.object({
    group_name: Joi.string().required(),
    lesson_start_time: Joi.string().required(),
    lesson_continuous: Joi.string().required(),
    lesson_week_days: Joi.string().required(),
    group_stage_id: Joi.string().hex().required(),
    room_number: Joi.string().required(),
    room_floor: Joi.number().required(),
    branch_id: Joi.string().hex().required(),
    lessons_quant: Joi.number().required(),
    is_active: Joi.boolean().default(true)
});

module.exports = { groupValidation };