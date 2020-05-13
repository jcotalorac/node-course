const jwt = require('jsonwebtoken');
const moongose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new moongose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "User one",
    email: "juancagado@hotmail.com",
    password: "otherpwd",
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwoId = new moongose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "User two",
    email: "mail@mail.com",
    password: "twopwd123",
    tokens: [{
        token: jwt.sign({ _id: userTwoId}, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new moongose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new moongose.Types.ObjectId(),
    description: "Second task ",
    completed: true,
    owner: userOne._id
};

const taskThree = {
    _id: new moongose.Types.ObjectId(),
    description: "Third task ",
    completed: true,
    owner: userTwo._id
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    setupDatabase
};