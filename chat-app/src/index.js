const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

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

    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, ackcallback) => {
        const filter = new Filter();

        if(filter.isProfane(message)){
            return ackcallback('Profanity is not allowed!');
        }

        io.emit('message', message);
        ackcallback();
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });

    socket.on('sendLocation', (location, ackcallback) => {
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
        ackcallback();
    });
});


server.listen(port, () => {
    console.log('Running on port ' + port);
});