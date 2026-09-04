const Payment = require("../model/paymentSchema");

const postPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    return res.status(201).json({
      success: true,
      message: "To'lov qabul qilindi",
      data: newPayment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const getPayment = async (req, res) => {
  try {
    const list = await Payment.find().populate("student_id");
    return res.status(200).json({
      success: true,
      message: "To'lovlar ro'yxati",
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

const searchPayment = async (req, res) => {
  try {
    const { q } = req.query;
    const list = await Payment
      .find()
      .populate("student_id");
    const filtered = list.filter(item => 
      item.student_id && item.student_id.first_name
        .toLowerCase()
        .includes((q || "")
        .toLowerCase())
    );
    return res.status(200).json({
      success: true,
      data: filtered
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const item = await Payment
      .findById(req.params.id)
      .populate("student_id");
    if (!item) return res.status(404).json({
      success: false,
      message: "To'lov topilmadi"
    });
    return res.status(200).json({
      success: true,
      message: "To'lov topildi",
      data: item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Icki server xatosi",
      error: error.message
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(400).json({ success: false, message: "To'lov topilmadi" });
    return res.status(200).json({
      success: true,
      message: "To'lov yangilandi",
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

const deletePayment = async (req, res) => {
  try {
    if (!await Payment.findByIdAndDelete(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "To'lov o'chirilmadi"
      });
    }
    return res.status(200).json({
      success: true,
      message: "O'chirildi"
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
  postPayment,
  getPayment,
  searchPayment,
  getPaymentById,
  updatePayment,
  deletePayment
};