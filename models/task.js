const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
    },
    // unique id of account that task belongs to
    uid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: false
    }
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;