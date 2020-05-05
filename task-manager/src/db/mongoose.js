const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
        default: 0
    }
});

const me = new User({
    name: 'JC',
    email: 'mail@mail.com'
});

me.save()
.then(() => {
    console.log(me);
})
.catch((error => {
    console.log('Error!', error);
}));

/* const Task = mongoose.model('Task', {
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
}); */