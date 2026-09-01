const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
    name: {
        type: String,
        require: true
    }
});

module.exports = model("role", roleSchema);