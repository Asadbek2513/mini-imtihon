const { Schema, model } = require("mongoose");

const group_stuffSchema = new Schema({
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "group", required: true
    },
    stuff_id: {
        type: Schema.Types.ObjectId,
        ref: "stuff", required: true
    }
});

module.exports = model("groupstuff", group_stuffSchema);