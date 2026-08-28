const { date } = require("joi");
const { Group } = require("../model/groupSchema");

const GroupRegister = async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    return res.status(200).json({
      success: true,
      message: "Yangi guruh yaratildi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getGroups = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      date: await Group.find()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Group.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      date: updated
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
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
      error: error.message
    });
  }
};

module.exports = {
  GroupRegister,
  getGroups,
  updateGroup,
  deletGroup
};