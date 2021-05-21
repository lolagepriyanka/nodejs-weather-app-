console.log('Client side js loaded!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);

    msg1.textContent = "Loading ....";
    msg2.textContent = "";

    const url = 'http://localhost:3000/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                msg1.textContent = data.error;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        })
    })
})