const Lid_status = require("../model/lid_statusSchema");

const postLid_status = async (req, res) => {
  try {
    const newLid_status = new Lid_status(req.body);
    await newLid_status.save();
    return res.status(200).json({
      success: true,
      message: "Status yaratildi",
      data: newLid_status
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getLid_status = async (req, res) => {
  try {
    const Lids_status = await Lid_status.find();
    return res.status(200).json({
      success: true,
      message: "Statuslar ro'yxati",
      date: Lids_status
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message,
    });
  }
};

const getLid_statusById = async (req, res) => {
    try {
        const lid_status = await Lid_status.findById(req.params.id);
        if (!lid_status) return res.status(404).json({
            success: false,
            message: "Bunday status topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Ma'lumot topildi",
            data: lid_status
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateLid_status = async (req, res) => {
  try {
    const updated = await Lid_status.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(400).json({
      succes: false,
      message: "Status yangilanmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Yangilandi",
      date: updated
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const deletLid_status = async (req, res) => {
  try {
    await Lid_status.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Status o'chirilish tugatildi"
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
  postLid_status,
  getLid_status,
  getLid_statusById,
  updateLid_status,
  deletLid_status
};