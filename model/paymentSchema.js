const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true },
    payment_date: {},
    payment_type: { type: String, enum: "card", required: true },
    collected_by: { type: String, required: true }
});

const Payment = model("Payment", paymentSchema);
module.exports = { Payment };