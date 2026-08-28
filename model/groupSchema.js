const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
  group_name: { type: String, required: true },
  lesson_start_time: { type: String, required: true },
  lesson_end_time: { type: String, required: true },
  lesson_days: { type: String, required: true },
  room_number: { type: String, required: true },
  branch: { type: String, required: true },
  teacher_name: { type: String, required: true },
  is_active: { type: Boolean, default: true }
});

const Group = model("Group", groupSchema);
module.exports = { Group };