const socket = io();

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('increment');
// });

const chatForm = document.querySelector('#message-form');


socket.on('message', (message) => {
    console.log(message);
});

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('sendMessage', event.target.elements.message.value);
});