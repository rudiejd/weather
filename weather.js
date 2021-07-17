const form = document.querySelector("form");
const image = document.querySelector("#weather_pic");
const result = document.querySelector("#result");
const loading = document.querySelector("#loading");
const checker = document.querySelector("#metCheck");
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const IMAGE_BASE_URL = 'https://openweathermap.org/img/wn/' 
const APP_ID = '33b3eb2c38ccc81f5347a4a74de46244';





function main (e) {
    const location = document.querySelector("#location").value;
    const useMetric = document.querySelector("#metCheck").checked;
    console.log(useMetric)
    e.preventDefault();
    if (!result.classList.contains('invis')) {
        result.classList.add('invis');
    }
    result.classList.remove('fade-element');
    getWeather(location, useMetric).then(res => displayWeather(res, useMetric).then( () => {
        result.classList.remove('invis');
        result.classList.add('fade-element');
    }));
}

async function getWeather(location, useMetric) {
    const response = await fetch(API_URL + new URLSearchParams({
        'q': location,
        'appid': APP_ID, 
        'units': useMetric ? 'metric' : 'imperial'
    })); 
    return response.json();
}

function displayWeather(res, useMetric) {
    const tempSuffix = useMetric ? "°C" : "°F";
    const speedSuffix = useMetric ? "m/s" : "mph"; 
    let pCity = document.querySelector("#city").innerHTML = `${res.name}, ${res.sys.country}`;
    let pImg = image.src = `${IMAGE_BASE_URL}${res.weather[0].icon}@2x.png`;
    let pTemp = document.querySelector("#temperature").innerHTML = `${res.main.temp} ${tempSuffix}`;
    let pMax = document.querySelector("#max").innerHTML = `${res.main.temp_max} ${tempSuffix}`;
    let pMin = document.querySelector("#min").innerHTML = `${res.main.temp_min} ${tempSuffix}`;
    let pFeel = document.querySelector("#feel").innerHTML = `${res.main.feels_like} ${tempSuffix}`;
    let pWindSpeed = document.querySelector("#wind_speed").innerHTML = `${res.wind.speed} ${speedSuffix}`;
    return Promise.all(pCity, pImg, pMax, pMin, pTemp, pFeel);
}


form.onsubmit = main;
checker.onchange = main;

window.onload = main;