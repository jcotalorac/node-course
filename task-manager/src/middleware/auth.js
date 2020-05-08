const auth = async (request, response, next) => {
    console.log('auth middleware');
    next();
};

module.exports = auth;