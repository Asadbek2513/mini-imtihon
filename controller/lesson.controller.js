const { date } = require("joi");
const { Lesson, Attendance } = require("../model/lessonSchema");

const createLesson = async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    return res.status(200).json({
      success: true,
      data: newLesson,
      message: "Dars rejasi yaratildi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const markAttendance = async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    return res.status(200).json({
      success: true,
      message: "Davomat yozildi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getAttendanceList = async (req, res) => {
  try {
    const list = await Attendance.find().populate(
      "student_id"
    );
    return res.status(200).json({
      success: true,
      date: list
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createLesson,
  markAttendance,
  getAttendanceList
};