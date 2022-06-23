const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Might need code that converts id to int here

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;