const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        const decoded = jsonwebtoken.verify(token, 'thisismynewcourse');
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token' : token
        });
        console.log(user);
    } catch (error) {
        response.status(401).send({ error: 'Please authenticate.' });
    }
    next();
};

module.exports = auth;