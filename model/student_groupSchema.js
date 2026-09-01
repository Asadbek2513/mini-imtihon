const { required } = require("joi");
const { Schema, model } = require("mongoose");

const student_groupSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: "students",
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "group",
        required: true
    }
});

module.exports = model("studentgroup", student_groupSchema);