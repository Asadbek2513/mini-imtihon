const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, default: "" },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    is_active: { type: Boolean, default: true }
});

const Student = model("Student", studentSchema);
module.exports = { Student };