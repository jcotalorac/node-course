const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.post('/tasks', async (request, response) => {
    const task = new Task(request.body);

    try {
        task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.get('/tasks', async (request, response) => {
    try {
        let allTasks = await Task.find();
        const count = await Task.countDocuments();
        allTasks.push(count);
        response.send(allTasks);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/tasks/:id', async (request, response) => {
    try {
        const task = await Task.findById(request.params.id);
        if(!task){
            return response.status(404).send();
        }
        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.patch('/tasks/:id', async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidUpdating = updates.every(update => allowedUpdates.includes(update));
    
    if(!isValidUpdating) {
        return response.status(400).send({ error: 'Invalid update!' });
    }

    try {
        const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true
        });
        if(!task) {
            return response.status(404).send();
        }
        response.send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (request, response) => {
    try {
        const task = await Task.findByIdAndDelete(request.params.id);

        if(!task) {
            return response.status(404).send();
        }
        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;