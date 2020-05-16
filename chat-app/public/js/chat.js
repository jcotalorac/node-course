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
const messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-message-template').innerHTML;

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (locMessage) => {
    console.log(locMessage);
    const html = Mustache.render(locationTemplate, {
        username: locMessage.username,
        url: locMessage.url,
        createdAt: moment(locMessage.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
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

socket.emit('join', { username, room }, (error) => {
    if(error) {
        alert(error);
        location.href = '/';
    }
});