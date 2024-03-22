// Model
let cityToSearch = "";

let weatherInfo = {
    city: null,
    degrees: null,
    humidity: null,
    description: null,
    emoji: null,
}

const apiKey = '08e7482af64d0f4b75ecad26b58b9bf3';

// View
function updateView() {
    const app = document.getElementById('app');
    app.innerHTML = /*HTML*/ `
    <div id="input-container">
        <input type="text" class="city-input" id="city-input" value="${cityToSearch}" oninput="inputCityName(this.value)" placeholder="Enter a city">
        <img src="sunandcloud.png" alt="A sun and cloud icon" id="weather-icon" onclick="fetchWeatherForecast()">
    </div>
    ${drawWeatherView(weatherInfo)}
`;
}

function drawWeatherView(weatherInfo) {
    if (weatherInfo.city == null) return ""
    const capitalizedDescription = weatherInfo.description.charAt(0).toUpperCase() + weatherInfo.description.slice(1);
    return /*HTML*/ `
    <div id="weather-card">
        <div id="city-name">${weatherInfo.city}</div>
        <div>${weatherInfo.degrees}°C</div>
        <div>Humidity: ${weatherInfo.humidity} %</div>
        <div id="description">${capitalizedDescription}</div>
        <div id="weather-emoji">${weatherInfo.emoji}</div>    
    </div>`;
}

// Controller
function inputCityName(inputCity) {
    cityToSearch = inputCity
    console.log(inputCity)
}

function fetchWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return '⛈️';
    } else if (weatherId >= 300 && weatherId < 400) {
        return '🌧️';
    } else if (weatherId >= 500 && weatherId < 600) {
        return '🌧️';
    } else if (weatherId >= 600 && weatherId < 700) {
        return '❄️';
    } else if (weatherId >= 700 && weatherId < 800) {
        return '☀️';
    } else if (weatherId >= 801 && weatherId < 810) {
        return '☁️';
    } else {
        return '❓';
    }
}

function fetchWeatherForecast() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}`;

    fetch(apiUrl).then(response => {
        if (!response.ok) {
            throw new Error('Could not fetch weather data');
        }
        return response.json();
    }).then(data => {
        weatherInfo.city = data.name;
        weatherInfo.degrees = Math.round(data.main.temp - 273.15);
        weatherInfo.humidity = data.main.humidity;
        weatherInfo.description = data.weather[0].description;
        weatherInfo.emoji = fetchWeatherEmoji(data.weather[0].id);
        updateView()
    });
}

// function fetchAndDisplayWeather() {
//     // fetchWeatherForecast(cityToSearch)
//     // updateView()
//     // .then(weatherInfo => { // .then/.try er det samme som if
//     //     const app = document.getElementById('weather-card');
//     //     app.innerHTML = drawWeatherView(weatherInfo);
//     // })
//     // .catch(error => { // .catch er en asynkron versjon av else
//     //     console.error('Feilmelding: ', error);
//     //     const app = document.getElementById('app');
//     //     app.innerHTML = `<div>Feilmelding: ${error.message}</div>`;
//     // });
// }

updateView();