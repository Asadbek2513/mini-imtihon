const Students = require("../model/studentsSchema");

const studentRegister = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const student = await Students.findOne({ phone_number });
    if (student) {
      return res.status(400).json({
        success: false,
        message: "Bunday o'quvchi mavjud"
      });
    }

    const newStudent = new Students(req.body);
    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Yangi o'quvchi qo'shildi",
      data: newStudent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const studentes = await Students
      .find()
      .populate("lid_id")
    return res.status(200).json({
      success: true,
      message: "Talabalar ro'yxati",
      data: studentes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Students
      .findById(req.params.id)
      .populate("lid_id");
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "O'quvchi topilmadi"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Talaba topildi",
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updated = await Students.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: "Yangilanmadi"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Yangilandi",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const deletStudent = async (req, res) => {
  try {
    const deleted = await Students.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: "O'quvchi topilmadi"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Yangi o'quvchi o'chirildi."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

module.exports = {
  studentRegister,
  getStudents,
  getStudentById,
  updateStudent,
  deletStudent
};