const { required } = require("joi");
const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
    lesson_theme: { type: String, required: true },
    lesson_number: { type: Number, required: true },
    group_id: { type: Schema.Types.ObjectId, ref: "group", required: true },
    lesson_date: { type: Date, required: true }
});

module.exports = model("lesson", lessonSchema);