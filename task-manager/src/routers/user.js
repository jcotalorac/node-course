const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.get('/users', async (request, response) => {
    try {
        let allUsers = await User.find();
        const count = await User.countDocuments();
        allUsers.push(count);
        response.send(allUsers);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/users/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        if(!user) {
            return response.status(404).send();
        }
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.patch('/users/:id', async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdating = updates.every(update => allowedUpdates.includes(update));
    
    if(!isValidUpdating) {
        return response.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true
        });
        if(!user) {
            return response.status(404).send();
        }
        response.send(user);
    } catch (error) {
        response.status(400).send();
    }
});

router.delete('/users/:id', async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.params.id);
        
        if(!user) {
            return response.status(404).send();
        }
        response.send(user);
    } catch (error) {
        response.send(500).send(error);
    }
});

module.exports = router;