const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        console.log(token);
    } catch (error) {
        response.status(401).send({ error: 'Please authenticate.' });
    }
    next();
};

module.exports = auth;