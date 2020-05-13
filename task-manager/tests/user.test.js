const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: "User one",
    email: "juancagado@hotmail.com",
    password: "otherpwd"
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