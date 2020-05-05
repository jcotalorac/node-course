const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task1 = new Task({
    description: "Task1"
});

task1.save()
.then(() => {
    console.log(task1);
})
.catch((error) => {
    console.log('Error!', error);
});