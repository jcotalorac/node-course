const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// let count = 0;

// io.on('connection', (socket) => {
//     console.log('New WebSocket connection');

//     socket.emit('countUpdated', count);
    
//     socket.on('increment', () => {
//         count++;
//         //socket.emit('countUpdated', count);
//         io.emit('countUpdated', count);
//     });
// });

io.on('connection', (socket) => {
    console.log('New socket connection');

    
    socket.on('join', (options, ackcallback) => {
        const { error, user } = addUser({
            id: socket.id,
            ...options
        });

        if(error) {
            return ackcallback(error);
        }

        socket.join(user.room);
        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));
        ackcallback();
    });

    socket.on('sendMessage', (message, ackcallback) => {
        const user = getUser(socket.id);

        const filter = new Filter();

        if(filter.isProfane(message)){
            return ackcallback('Profanity is not allowed!');
        }

        io.to(user.room).emit('message', generateMessage(message));
        ackcallback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left!`));
        }
    });

    socket.on('sendLocation', (location, ackcallback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`));
        ackcallback();
    });
});


server.listen(port, () => {
    console.log('Running on port ' + port);
});