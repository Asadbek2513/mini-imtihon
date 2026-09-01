const Group = require("../model/groupSchema");

const GroupRegister = async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    return res.status(200).json({
      success: true,
      message: "Yangi guruh yaratildi",
      data: newGroup
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group
      .find()
      .populate("group_stage_id")
      .populate("branch_id");
    return res.status(200).json({
      success: true,
      message: "Guruh ro'yxati",
      date: groups
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message,
    });
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await Group
      .findById(req.params.id)
      .populate("group_stage_id")
      .populate("branch_id");
    if (!group) return res.status(404).json({
      success: false,
      message: "Bunday gruh topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Ma'lumot topildi",
      data: group
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const updateGroup = async (req, res) => {
  try {
    const updated = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(400).json({
      succes: false,
      message: "Guruh yangilanmadi"
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

const deletGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Guruhni o'chirilish tugatildi"
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
  GroupRegister,
  getGroups,
  getGroupById,
  updateGroup,
  deletGroup
};