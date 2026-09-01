const { Schema, model } = require("mongoose");

const branchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    call_number: {
        type: String,
        required: true
    }
});

module.exports = model("branch", branchSchema);