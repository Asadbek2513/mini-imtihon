const { Schema, model } = require("mongoose");

const student_lessonSchema = new Schema({
    lesson_id: { type: Schema.Types.ObjectId, ref: "lesson", required: true },
    student_id: { type: Schema.Types.ObjectId, ref: "students", required: true },
    is_there: { type: Boolean, default: false },
    reason: { type: String, default: "" },
    be_paid: { type: Boolean, default: false }
});

module.exports = model("studentlesson", student_lessonSchema);