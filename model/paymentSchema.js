const { required } = require("joi");
const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "students", required: true },
    payment_last_date: { type: Date, required: true },
    payment_date: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    is_paid: { type: Boolean, default: true },
    total_attent: { type: Number, default: 0 }
});

module.exports = model("payment", paymentSchema);