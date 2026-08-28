const { Schema, model } = require("mongoose");

const lidSchema = new Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, required: true, default: "" },
    reason: { type: String, default: "" },
    branch: { type: String, required: true },
    created_by: { type: String, required: true },
    description: { type: String, default: "" }
});

const Lid = model("Lid", lidSchema);
module.exports = { Lid };