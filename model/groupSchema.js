const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
  group_name: { type: String, required: true },
  lesson_start_time: { type: String, required: true },
  lesson_continuous: { type: String, required: true },
  lesson_week_days: { type: String, required: true },
  group_stage_id: { type: Schema.Types.ObjectId, ref: "stage",  required: true },
  room_number: { type: String, required: true },
  room_floor: { type: String, required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: "branch", required: true },
  lesson_quant: { type: Number, required: true },
  is_active: { type: Boolean, default: true }
});

module.exports = model("group", groupSchema);