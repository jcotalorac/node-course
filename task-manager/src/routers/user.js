const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(request, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('File must be a jpg, jpeg or png'));
        }

        callback(undefined, true);
    }
});

router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        response.status(201).send({ user, token });
    } catch (error) {
        response.status(400).send(error);
    }
});

router.post('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({ user, token });
    } catch (error) {
        response.status(400).send(error);
    }
});

router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.token;
        });
        await request.user.save();

        response.send();
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        request.user.tokens = [];
        await request.user.save();
        response.send();
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/users/me', auth, async (request, response) => {
    response.send(request.user);
});

router.get('/users', async (request, response) => {
    try {
        let allUsers = await User.find();
        const count = await User.countDocuments();
        allUsers.push(count);
        response.send(allUsers);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get('/users/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        if(!user) {
            return response.status(404).send();
        }
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

/* router.patch('/users/:id', async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdating = updates.every(update => allowedUpdates.includes(update));
    
    if(!isValidUpdating) {
        return response.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findById(request.params.id);
        if(!user) {
            return response.status(404).send();
        }
        updates.forEach(update => user[update] = request.body[update]);
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(400).send();
    }
}); */

router.patch('/users/me', auth, async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdating = updates.every(update => allowedUpdates.includes(update));
    
    if(!isValidUpdating) {
        return response.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        updates.forEach(update => request.user[update] = request.body[update]);
        await request.user.save();
        response.send(request.user);
    } catch (error) {
        response.status(400).send();
    }
});

/* router.delete('/users/:id', async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.params.id);
        
        if(!user) {
            return response.status(404).send();
        }
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
}); */

router.delete('/users/me', auth, async (request, response) => {
    try {
        //const user = await User.findByIdAndDelete(request.params.id);
        
        /*if(!user) {
            return response.status(404).send();
        }*/
        request.user.remove();
        response.send(request.user);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (request, response) => {
    request.user.avatar = request.file.buffer;
    await request.user.save();
    response.send();
}, (error, request, response, next) => {
    response.status(400).send(error.message);
});

router.delete('/users/me/avatar', auth, async (request, response) => {
    request.user.avatar = undefined;
    await request.user.save();
    response.send();
});

module.exports = router;