const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

app.get('/users', async (request, response) => {
    try {
        let allUsers = await User.find();
        const count = await User.countDocuments();
        allUsers.push(count);
        response.send(allUsers);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/users/:id', async (request, response) => {
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

app.post('/tasks', async (request, response) => {
    const task = new Task(request.body);

    try {
        task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

app.get('/tasks', async (request, response) => {
    try {
        let allTasks = await Task.find();
        const count = await Task.countDocuments();
        allTasks.push(count);
        response.send(allTasks);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/tasks/:id', async (request, response) => {
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

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
