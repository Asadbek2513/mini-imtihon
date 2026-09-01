const Group_stuff = require("../model/groupSchema");

const postGroup_stuff = async (req, res) => {
  try {
    const newGroup_stuff = new Group(req.body);
    await newGroup_stuff.save();
    return res.status(200).json({
      success: true,
      message: "O'qiyuvchi guruhga qo'shildi",
      data: newGroup_stuff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const getGroups_stuff = async (req, res) => {
  try {
    const groups_stuff = await Group.find(
    ).populate(
      "group_id"
    ).populate(
      "stuff_id"
    );
    return res.status(200).json({
      success: true,
      message: "O'quvchi ro'yxati",
      date: groups_stuff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message,
    });
  }
};

const getGroup_stuffById = async (req, res) => {
  try {
    const group_stuff = await Group
      .findById(req.params.id)
      .populate("group_id")
      .populate("stuff_id");
    if (!group_stuff) return res.status(404).json({
      success: false,
      message: "Topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Ma'lumot topildi",
      data: group_stuff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
      error: error.message
    });
  }
};

const updateGroup_stuff = async (req, res) => {
  try {
    const updated = await Group_stuff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(400).json({
      succes: false,
      message: "Topilmadi"
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

const deletGroup_stuff = async (req, res) => {
  try {
    await Group_stuff.findByIdAndDelete(req.params.id);
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
  postGroup_stuff,
  getGroups_stuff,
  getGroup_stuffById,
  updateGroup_stuff,
  deletGroup_stuff
};