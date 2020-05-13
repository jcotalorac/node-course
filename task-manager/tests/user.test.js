const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: "A name",
        email: "mail@mail.com",
        password: "pwd12345"
    }).expect(201);
});