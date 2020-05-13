const request = require('supertest');
const jwt = require('jsonwebtoken');
const moongose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

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

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: "A name",
        email: "jcotalorac@gmail.com",
        password: "pwd12345"
    }).expect(201);
});

test('Should login existent user', async() => {
    await request(app).post('/users/login').send(userOne).expect(200);
});

test('Should login not existent user', async() => {
    await request(app).post('/users/login').send({
        email: "mail@mail.com",
        password: "pwdnotexistent"
    }).expect(400);
});

test('Should get profile user', async() => {
    await request(app).get('/users/me').set('Authorization', 'Bearer ' + userOne.tokens[0].token).send().expect(200);
});

test('Should not get profile for unauthenticades user', async() => {
    await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async() => {
    await request(app).delete('/users/me').set('Authorization', 'Bearer ' + userOne.tokens[0].token).send().expect(200);
});