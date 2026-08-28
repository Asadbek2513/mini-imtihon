const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
    group_name: { type: String, required: true },
    lesson_title: { type: String, required: true },
    lesson_date: { type: String, required: true },
    stage_name: { type: String, required: true }
});

const attendanceSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    lesson_id: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    is_present: { type: Boolean, default: true },
    score: { type: Number, default: 0 }
});

const Lesson = model("Lesson", lessonSchema);
const Attendance = model("Attendance", attendanceSchema);

module.exports = {
  Lesson,
  Attendance
};
