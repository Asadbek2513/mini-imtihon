const { Schema, model } = require("mongoose");

const studentsSchema = new Schema({
    lid_id: { type: Schema.Types.ObjectId, ref: "lid" },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    birthday: { type: Date },
    gender: { type: String, required: true }
});

module.exports = model("students", studentsSchema);