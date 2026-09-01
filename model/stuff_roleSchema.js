const { Schema, model } = require("mongoose");

const stuff_roleSchema = new Schema({
    stuff_id: {
        type: Schema.Types.ObjectId,
        ref: "stuff",
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: "role",
        required: true
    }
});

module.exports = model("stuffrole", stuff_roleSchema);