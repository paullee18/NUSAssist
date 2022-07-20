const express = require('express');
const router = express.Router();
const db = require("../../models/task")

function success(res, payload) {
    return res.status(200).json(payload)
}

// Get all tasks
router.get('/', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const tasks = await db.find({ uid: req.headers.uid });
            return success(res, tasks);
        }
        return res.status(400).json({ msg: "Not authorised "});
    } catch (err) {
        return res.status(400).json({ msg: "Failed to get todos" })
    }
});

// Create task
router.post('/', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const task = new db(req.body);
            const savedTask = task.save();
            return success(res, task);
        }
        return res.status(400).json({ msg: "Not authorised" });
    } catch(err) {
        return res.status(400).json({ msg: "Failed to create task"});
    }
})

// Update task
router.put('/:id', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const task = await db.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            return success(res, task);
        }
        return res.status(400).json({ msg: "Not authorised" });
    } catch (err) {
        return res.status(400).json({ msg: "Failed to update task"});
    }

})

// Delete task
router.delete('/:id', async(req, res) => {
    try {
        const auth = req.currentUser;
        if (auth) {
            const removed = await db.findByIdAndRemove(req.params.id)
            return success(res, removed);
        }
        return res.status(400).json({ msg: "Not authorised" });
    } catch (err) {
        return res.status(400).json({ msg: "Failed to delete todo"});
    }
})

module.exports = router;