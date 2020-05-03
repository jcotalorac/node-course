console.log('Client site javascript file is loaded!');

fetch('http://localhost:3000/weather?address=Madelena').then(response => {
    response.json().then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    });
});

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (event) => {
    console.log('abc');
    
});