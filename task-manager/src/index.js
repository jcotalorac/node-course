const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);



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

app.patch('/tasks/:id', async (request, response) => {
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

app.delete('/tasks/:id', async (request, response) => {
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

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
