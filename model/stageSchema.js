const { Schema, model } = require("mongoose");

const stageSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = model("stage", stageSchema);