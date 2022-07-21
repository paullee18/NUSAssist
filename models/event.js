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
        type: Integer,
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
        required: true
    },
    startTime: {
        type: Integer,
        required: false
    },
    endTime: {
        type: Integer,
        required: true
    }
});

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;