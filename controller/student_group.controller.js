const Student_group = require("../model/student_groupSchema");

const postStudent_group = async (req, res) => {
  try {
    const newStudent_group = (req.body);
    await newStudent_group.save();
    return res.status(201).json({
      success: true,
      message: "Yangi o'quvchi guruhga biriktirildi qo'shildi",
      data: newStudent_group
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getStudent_group = async (req, res) => {
  try {
    const list = await Student_group
      .find()
      .populate("student_id")
      .populate("group_id");
    return res.status(200).json({
      success: true,
      message: "Ro'yxat qaytarildi",
      data: list
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const getStudent_groupById = async (req, res) => {
  try {
    const student = await Student_group
      .findById(req.params.id)
      .populate("student_id")
      .populate("group_id");
    if (!student) return res.status(404).json({
        success: false,
        message: "O'quvchi topilmadi"
      });
    return res.status(200).json({
      success: true,
      message: "Topildi",
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

const updateStudent_group = async (req, res) => {
  try {
    const updated = await Student_group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: "O'quvchi topilmadi"
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

const deletStudent_group = async (req, res) => {
  try {
    const deleted = await Student_group.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(400).json({
        success: false,
        message: "O'quvchi topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Yangi o'quvchi o'chirildi.",
      data: deleted
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
  postStudent_group,
  getStudent_group,
  getStudent_groupById,
  updateStudent_group,
  deletStudent_group
};