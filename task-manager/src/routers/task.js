const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/tasks', auth, async (request, response) => {
    const task = new Task({
        ...request.body,
        owner: request.user._id
    });

    try {
        await task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

// router.get('/tasks', async (request, response) => {
//     try {
//         let allTasks = await Task.find();
//         const count = await Task.countDocuments();
//         allTasks.push(count);
//         response.send(allTasks);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

router.get('/tasks', auth, async (request, response) => {
    try {
        const match = {};
        const sort = {};

        if(request.query.completed){
            match.completed = request.query.completed === 'true';
        }

        if(request.query.sortBy) {
            const [field, ordering] = request.query.sortBy.split(':');
            sort[field] = ordering === 'desc' ? -1 : 1;
        }

        await request.user.populate({
            path: 'tasks',
            match,
            options : {
                limit: parseInt(request.query.limit),
                skip: parseInt(request.query.skip),
                sort
            }
        }).execPopulate();
        const allTasks = request.user.tasks;
        //const count = await Task.countDocuments();
        //allTasks.push(count);
        response.send(allTasks);
    } catch (error) {
        response.status(500).send(error);
    }
});

// router.get('/tasks/:id', async (request, response) => {
//     try {
//         const task = await Task.findById(request.params.id);
//         if(!task){
//             return response.status(404).send();
//         }
//         response.send(task);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

router.get('/tasks/:id', auth, async (request, response) => {
    try {
        const task = await Task.findOne({
            _id: request.params.id,
            owner: request.user._id
        });
        if(!task){
            return response.status(404).send();
        }
        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

// router.patch('/tasks/:id', async (request, response) => {
//     const updates = Object.keys(request.body);
//     const allowedUpdates = ['description', 'completed'];

//     const isValidUpdating = updates.every(update => allowedUpdates.includes(update));
    
//     if(!isValidUpdating) {
//         return response.status(400).send({ error: 'Invalid update!' });
//     }

//     try {
//         const task = await Task.findById(request.params.id);
//         if(!task) {
//             return response.status(404).send();
//         }
//         updates.forEach(update => task[update] = request.body[update]);
//         await task.save();

//         response.send(task);
//     } catch (error) {
//         response.status(400).send(error);
//     }
// });

router.patch('/tasks/:id', auth, async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidUpdating = updates.every(update => allowedUpdates.includes(update));
    
    if(!isValidUpdating) {
        return response.status(400).send({ error: 'Invalid update!' });
    }

    try {
        const task = await Task.findOne({
            _id: request.params.id,
            owner: request.user._id
        });
        if(!task) {
            return response.status(404).send();
        }
        updates.forEach(update => task[update] = request.body[update]);
        await task.save();

        response.send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

// router.delete('/tasks/:id', async (request, response) => {
//     try {
//         const task = await Task.findByIdAndDelete(request.params.id);

//         if(!task) {
//             return response.status(404).send();
//         }
//         response.send(task);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

router.delete('/tasks/:id', auth, async (request, response) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: request.params.id,
            owner: request.user._id
        });

        if(!task) {
            return response.status(404).send();
        }
        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;