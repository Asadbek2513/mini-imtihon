const Reason_lid = require("../model/reason_lidSchema");

const postReason_lid = async (req, res) => {
  try {
    const newReason_lid = new Reason_lid(req.body);
    await newReason_lid.save();
    return res.status(200).json({
      success: true,
      message: "Rad sababi qo'shildi",
      data: newReason_lid
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getReason_lid = async (req, res) => {
  try {
    const reasons = await Reason_lid.find();
    return res.status(200).json({
      success: true,
      message: "Sabablar ro'yxati",
      date: reasons
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message,
    });
  }
};

const searchReason_lid = async (req, res) => {
  try {
    const { q } = req.query;
    const data = await Reason_lid.find({
      reason_lid: {
        $regex: q || "",
        $options: "i"
      }
    });
    return res.status(200).json({
      success: true,
      data: Reason_lid
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getReason_lidById = async (req, res) => {
    try {
        const reason = await Reason_lid.findById(req.params.id);
        if (!reason) return res.status(404).json({
            success: false,
            message: "Topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Sabab topildi",
            data: reason
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const updateReason_lid = async (req, res) => {
  try {
    const updated = await Reason_lid.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(400).json({
      succes: false,
      message: "Qo'shilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Yangilandi",
      date: updated
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const deletReason_lid = async (req, res) => {
  try {
    await Reason_lid.findByIdAndDelete(req.params.id);
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
  postReason_lid,
  getReason_lid,
  searchReason_lid,
  getReason_lidById,
  updateReason_lid,
  deletReason_lid
};