const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false
    },
    day: {
        type: Number,
        required: true
    },
    id: {
        type: Date,
        required: true
    },
    // unique id of account that event belongs to
    uid: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: true
    }
});

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;