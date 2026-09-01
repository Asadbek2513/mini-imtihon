const { Schema, model } = require("mongoose");

const lidSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    lid_stage_id: { type: Schema.Types.ObjectId, ref: "stage" },
    test_date: { type: Date },
    trial_lesson_date: { type: Date },
    trial_lesson_time: { type: String },
    trial_lesson_group_id: { type: Schema.Types.ObjectId, ref: "group" },
    lid_status_id: { type: Schema.Types.ObjectId, ref: "lidstatus", required: true },
    cancel_reason_id: { type: Schema.Types.ObjectId, ref: "reasonlid"}
});

module.exports = model("lid", lidSchema);