const { date } = require("joi");
const { Lid } = require("../model/lidSchema");

const lidRegister = async (req, res) => {
  try {
    const lid = await Lid.findOne({
      phone: req.body.phone
    });
    if (lid) return res.status(400).json({
      success: false,
      message: "Bunday ma'lumot mavjud"
    });
    const newLid = new Lid(req.body);
    await newLid.save();
    return res.status(200).json({
      success: true,
      message: "Ma'lumot muvaffaqiyatli qo'shildi"
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
    return res.status(200).json({
      success: true,
      date: await Lid.find()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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
      date: updated
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deletLid = async (req, res) => {
  try {
    if (!await Lid.findByIdAndDelete(
      req.params.id
    )) return res.status(400).json({
      success: false,
      message: "Topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "Delet bajarildi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  lidRegister,
  getLid,
  updateLid,
  deletLid
};