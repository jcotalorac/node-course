const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (request, response) => {
    const user = new User(request.body);

    user.save()
    .then(() => {
        response.status(201).send(user);
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

app.get('/users', (request, response) => {
    const allUsers = async () => {
        let allUsers = await User.find();
        const count = await User.countDocuments();
        allUsers.push(count);
        return allUsers;
    };

    allUsers()
    .then((result) => {
        response.send(result);
    })
    .catch((error) => {
        response.status(500).send(error);
    });
});

app.get('/users/:id', (request, response) => {
    User.findById(request.params.id)
    .then((user) => {
        if(!user) {
            return response.status(404).send();
        }
        response.send(user);
    })
    .catch((error) => {
        response.status(500).send(error);
    });
});

app.post('/tasks', (request, response) => {
    const task = new Task(request.body);

    task.save()
    .then(() => {
        response.status(201).send(task);
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

app.get('/tasks', (request, response) => {
    let allTasks;
    Task.find()
    .then((tasks) => {
        allTasks = tasks;
        return Task.countDocuments({});
    })
    .then((count) => {
        allTasks.push(count);
        response.send(allTasks);
    })
    .catch((error) => {
        response.status(500).send(error);
    });
});

app.get('/tasks/:id', (request, response) => {
    Task.findById(request.params.id)
    .then((task) => {
        if(!task){
            return response.status(404).send();
        }
        response.send(task);
    })
    .catch((error) => {
        response.status(500).send(error);
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
