const Lid = require("../model/lidSchema");

const lidRegister = async (req, res) => {
  try {
    const newLid = new Lid(req.body);
    await newLid.save();
    return res.status(201).json({
      success: true,
      message: "Ma'lumot muvaffaqiyatli qo'shildi",
      data: newLid
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getLid = async (req, res) => {
  try {
    const lids = await Lid.find()
      .populate("lid_stage_id")
      .populate("trial_lesson_group_id")
      .populate("lid_status_id")
      .populate("cancel_reason_id");
    return res.status(200).json({
      success: true,
      message: "Lidlar ro'yxati qaytarildi",
      data: lids
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getLidById = async (req, res) => {
  try {
    const lid = await Lid.findById(req.params.id)
      .populate("lid_stage_id")
      .populate("trial_lesson_group_id")
      .populate("lid_status_id")
      .populate("cancel_reason_id");
    if (!lid) return res.status(404).json({
      success: false,
      message: "Bunday lid topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Lid topildi",
      data: lid
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const updateLid = async (req, res) => {
  try {
    const updated = await Lid.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(400).json({
      success: false,
      message: "Bunday lid topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Lid yangilandi",
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

const deletLid = async (req, res) => {
  try {
    if (!await Lid.findByIdAndDelete(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Lid o'chirildi"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delet bajarildi"
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
  lidRegister,
  getLid,
  getLidById,
  updateLid,
  deletLid
};