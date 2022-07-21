const express = require('express');
const router = express.Router();
const db = require("../../models/event")

function success(res, payload) {
    return res.status(200).json(payload)
}

// Get all events
router.get('/', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const events = await db.find({ uid: req.headers.uid });
            return success(res, events);
        }
        return res.status(400).json({ msg: "Not authorised "});
    } catch (err) {
        return res.status(400).json({ msg: "Failed to get events" })
    }
});

// Create event
router.post('/', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const event = new db(req.body);
            const savedEvent = event.save();
            return success(res, event);
        }
        return res.status(400).json({ msg: "Not authorised" });
    } catch(err) {
        return res.status(400).json({ msg: "Failed to create event"});
    }
})

// Update event
router.put('/:id', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const event = await db.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            return success(res, event);
        }
        return res.status(400).json({ msg: "Not authorised" });
    } catch (err) {
        return res.status(400).json({ msg: "Failed to update event"});
    }

})

// Delete event
router.delete('/:id', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const removed = await db.findByIdAndRemove(req.params.id)
            return success(res, removed);
        }
        return res.status(400).json({ msg: "Not authorised" });
    } catch (err) {
        return res.status(400).json({ msg: "Failed to delete event"});
    }
})

module.exports = router;