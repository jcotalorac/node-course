const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = '';
    messageTwo.textContent = '';
    fetch(`/weather?address=${input.value}`).then(response => {
        response.json().then(data => {
            if(data.message) {
                messageOne.textContent = data.message;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.result;
            }
        });
    });
});