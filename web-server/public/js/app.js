console.log('Client site javascript file is loaded!');

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = '';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${input.value}`).then(response => {
        response.json().then(data => {
            if(data.message) {
                messageOne.textContent = data.message;
            } else {
                messageTwo.textContent = `${data.location}, ${data.weatherDescription}`;                
            }
        });
    });
});