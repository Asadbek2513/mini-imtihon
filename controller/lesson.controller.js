const Lesson = require("../model/lessonSchema");

const postLesson = async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    return res.status(200).json({
      success: true,
      message: "Dars rejasi yaratildi",
      data: newLesson
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getLesson = async (req, res) => {
  try {
    const list = await Lesson.find().populate("group_id");
    return res.status(200).json({
      success: true,
      message: "Dars ro'yxati",
      data: list
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson
      .findById(req.params.id)
      .populate("group_id");
    if (!lesson) return res.status(404).json({
      success: false,
      message: "Dars topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Dars topildi",
      data: lesson
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const updateLesson = async (req, res) => {
  try {
    const updated = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(400).json({
      success: false,
      message: "Dars yangilanmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Dars yangilandi",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const deleteLesson = async (req, res) => {
  try {
    if (!await Lesson.findByIdAndDelete(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Dars o'chirilmadi"
      });
    }
    return res.status(200).json({
      success: true,
      message: "O'chirildi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

module.exports = {
  postLesson,
  getLesson,
  getLessonById,
  updateLesson,
  deleteLesson
};