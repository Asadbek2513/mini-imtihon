const { Schema, model } = require("mongoose");

const stuffSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    login: { type: String, required: true },
    parol: { type: String, required: true },
    is_active: { type: Boolean, default: true }
});

module.exports = model("stuff", stuffSchema);