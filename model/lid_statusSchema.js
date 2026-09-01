const { Schema, model } = require("mongoose");

const lid_statusSchema = new Schema({
    status: {
        type: String,
        require: true
    }
});

module.exports = model("lid_status", lid_statusSchema);