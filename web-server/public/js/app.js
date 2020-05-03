console.log('Client site javascript file is loaded!');

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/weather?address=${input.value}`).then(response => {
        response.json().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                console.log(data);
            }
        });
    });
});