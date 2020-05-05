const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

/* const me = new User({
    name: "JC",
    age: 'age'
});

me.save()
.then(() => {
    console.log(me);
})
.catch((error => {
    console.log('Error!', error);
})); */

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task1 = new Task({
    description: "Task1",
    completed: false
});

task1.save()
.then(() => {
    console.log(task1);
})
.catch((error) => {
    console.log('Error!', error);
});