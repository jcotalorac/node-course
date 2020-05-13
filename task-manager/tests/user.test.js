const request = require('supertest');
const app = require('../src/app');

beforeEach(() => {
    console.log('beforeEach');
});

afterEach(() => {
    console.log('afterEach');
});

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: "A name",
        email: "jcotalorac@gmail.com",
        password: "pwd12345"
    }).expect(201);
});