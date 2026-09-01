const Joi = require("joi");

const lidValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().pattern(/^\+998\d{9}$/).required(),
    lid_stage_id: Joi.string().hex(),
    test_date: Joi.date(),
    trial_lesson_date: Joi.date(),
    trial_lesson_time: Joi.string(),
    trial_lesson_group_id: Joi.string().hex(),
    lis_status_id: Joi.string().hex().required(),
    cancel_reason_id: Joi.string().hex()
});

module.exports = { lidValidation };