
const weatherForm = document.querySelector('form');

const searchInput = document.querySelector('input');

const messageOne = document.querySelector('#m1');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = searchInput.value; 
    messageOne.textContent = "Loading...";
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }else{messageOne.textContent = "Temperature: " + data.forecast.Temperature
                                            +" Percipitation:" + data.forecast.Percipitation;}
        })
    });
});
