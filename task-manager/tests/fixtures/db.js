const jwt = require('jsonwebtoken');
const moongose = require('mongoose');
const User = require('../../src/models/user');

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

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

module.exports = {
    userOneId,
    userOne,
    setupDatabase
};