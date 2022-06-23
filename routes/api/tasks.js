const express = require('express');
const router = express.Router();
const db = require("../../models/task")

function success(res, payload) {
    return res.status(200).json(payload)
}

// Get all tasks
router.get('/', async(req, res) => {
    try {
        const tasks = await db.find({});
        return success(res, tasks);
    } catch (err) {
        return res.status(400).json({ msg: "failed to get todos" })
    }
});

// Create task
router.post('/', async(req, res) => {
    try {
        const task = new db(req.body);
        const savedPhone = task.save();
        return success(res, savedPhone);
    } catch(err) {
        return res.status(400).json({ msg: "failed to create task"});
    }
})

// Update task
router.put('/:id', async(req, res) => {
    try {
        const task = await db.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        return success(res, task);
    } catch (err) {
        return res.status(400).json({ msg: "Failed to update task"});
    }

})

// Delete task
router.delete('/:id', async(req, res) => {
    try {
        const removed = await db.findByIdAndRemove(req.params.id)
        return success(res, removed);
    } catch (err) {
        return res.status(400).json({ msg: "Failed to delete todo"});
    }
})

module.exports = router;