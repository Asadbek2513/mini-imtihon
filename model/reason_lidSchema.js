const { Schema, model } = require("mongoose");

const reason_lidSchema = new Schema({
    reason_lid: {
        type: String,
        required: true
    }
});

module.exports = ("reason_lid", reason_lidSchema);