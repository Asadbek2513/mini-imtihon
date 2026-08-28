const { Payment } = require("../model/paymentSchema");

const paymentRegister = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    return res.status(200).json({
      success: true,
      message: "To'lov qilindi"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getPayment = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: await Payment.find().populate(
        "student_id"
      )
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  paymentRegister,
  getPayment
}