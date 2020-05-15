const socket = io();

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('increment');
// });

const chatForm = document.querySelector('#message-form');
const chatInput = chatForm.querySelector('input');
const chatButton = chatForm.querySelector('button');
const locationButton = document.querySelector('#send-location');

socket.on('message', (message) => {
    console.log(message);
});

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    chatButton.setAttribute('disabled', 'disabled');
    
    socket.emit('sendMessage', event.target.elements.message.value, (error) => {
        chatButton.removeAttribute('disabled');
        chatInput.value = '';
        chatInput.focus();
        if(error) {
            return console.log(error);
        }

        console.log('Message delivered');
    });
});

locationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            locationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});