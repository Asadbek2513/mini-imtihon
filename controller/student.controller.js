const { data } = require("joi");
const bcrypt = require("bcrypt");
const { Student } = require("../model/studentSchema");

const studentRegister = async (req, res) => {
  try {
    const student = await Student.findOne({
      phone: req.body.phone
    });
    if (student) return res.status(400).json({
      success: false,
      message: "Bunday o'quvchi mavjud"
    });
    const studentPassword = await bcrypt.hash(
      req.body.password,
      10
    );
    const newStudent = new Student({
      ...req.body,
      password: studentPassword
    })
    await newStudent.save();
    return res.status(200).json({
      success: true,
      message: "Yangi o'quvchi qo'shildi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getStudents = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: await Student.find().select("-password")
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    if (req.body.password) req.body.password = await bcrypt.hash(
      req.body.password,
      10
    );
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deletStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: "Yangi o'quvchi o'chirildi."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { 
  studentRegister,
  getStudents,
  updateStudent,
  deletStudent
};