let cities = document.getElementById('cities');

let h1 = document.getElementById('h1');
let p = document.getElementById('p');
let pp = document.getElementById('pp');
let today_temp = document.querySelector('.today-widget__value');
let today_img = document.querySelector('.today-widget__icon-wrapper');
let img = document.querySelectorAll('.daily-row__icon-wrapper');
let degree_high = document.querySelectorAll('.degree-high');
let degree_min = document.querySelectorAll('.degree-min');
let precipitation = document.getElementById('precipitation');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let daily_pressure = document.querySelectorAll('.daily-row__pollen');
let wind = document.getElementById('wind');
let next_date = document.querySelectorAll('.daily-row__day');
let temp_max = [];
let temp_min = [];
let weather_id = [];
let day_pressure = [];
let weekaday = [];

let date = new Date();

let day = date.toLocaleString('en', { day: 'numeric' }) % 10;
let hour = date.toLocaleString('ru', { hour: 'numeric' });

const startNigth = 21;
const endNight = 3;

const clearWeather = 800;
const fewClouds = 801;
const scatteredClouds = 802;
const brokenClouds = 803;
const overcastClouds = 804;
const thunderStorm = 2;
const drizzle = 3;
const rainId = 5;
const snowId = 6;
const atmosphere = 7;

const nextDayId = 8;
const nextFourDays = 4;

cities.childNodes.forEach(city => {
    let label = city.id;
    city.addEventListener('click', () => {
        updatecity(label);
    });
});


function updatecity(city) {
    let rootUrl;
    /* if (city === 'Dubai' || city === 'Tokyo' || city === 'Vladivostok') {
        rootUrl = 'http://localhost:3000/';
    } else { */
    rootUrl =
        'http://api.openweathermap.org/data/2.5/forecast?appid=e33262cd6a432b1c3dc5181a736dbc41&q=';
    /* } */
    let url = rootUrl + encodeURIComponent(city);

    request(url);
}

function request(url) {
    fetch(url)
        .then(async function (response) {
            let myjson = await response.json();
            return myjson;
        })
        .then(updateWeather)
        .then(updateRestWeatherImg)
        .then(updateRestlessWeatherImg)
        .then(updateDailyRowImages)
        .then(updateDailyRowData)
        .catch(error);
}

function error(error) {
    console.log(error);
}

function updateWeather(myjson) {
    pp.innerHTML = myjson.list[0].weather[0].main;
    h1.innerHTML = myjson.city.name;
    p.innerHTML =
        date.toLocaleString('en', { weekday: 'long' }) +
        ', ' +
        date.toLocaleString('en', { month: 'long', day: 'numeric' }) +
        endOfday(day);
    today_temp.innerHTML = Math.round(myjson.list[0].main.temp) + '°K';
    precipitation.innerHTML =
        'Precipitation: ' + myjson.list[0].clouds.all + ' %';
    humidity.innerHTML = 'Humidity: ' + myjson.list[0].main.humidity + ' %';
    pressure.innerHTML =
        'Pressure: ' + Math.round(myjson.list[0].main.pressure) + ' hPA';
    wind.innerHTML = 'Wind: ' + Math.round(myjson.list[0].wind.speed) + ' m/s';

    return myjson;
}

function endOfday(day) {
    if (day == 2) {
        return 'nd';
    } else if (day == 1) {
        return 'st';
    } else if (day == 3) {
        return 'rd';
    } else return 'th';
}

function updateRestWeatherImg(myjson) {
    const today_weather = myjson.list[0].weather[0].id;
    switch (today_weather) {
        case clearWeather:
            renderImageWeather(nightImages.clear, dayImages.clear);
            break;
        case fewClouds:
            renderImageWeather(nightImages.fewClouds, dayImages.fewClouds);
            break;
        case scatteredClouds:
            renderImageWeather(nightImages.scatteredClouds, dayImages.scatteredClouds);
            break;
        case (overcastClouds):
            renderImageWeather(nightImages.brokenClouds, dayImages.brokenClouds);
            break;
        case (brokenClouds):
            renderImageWeather(nightImages.brokenClouds, dayImages.brokenClouds);
            break;
    }
    return myjson;
}

function updateRestlessWeatherImg(myjson) {
    const today_weather = Math.trunc(myjson.list[0].weather[0].id / 100);
    switch (today_weather) {
        case drizzle:
            renderImageWeather(nightImages.drizzle, dayImages.drizzle);
            break;
        case rainId:
            renderImageWeather(nightImages.rain, dayImages.rain);
            break;
        case thunderStorm:
            renderImageWeather(nightImages.thunderStorm, dayImages.thunderStorm);
            break;
        case snowId:
            renderImageWeather(nightImages.snow, dayImages.snow);
            break;
        case atmosphere:
            renderImageWeather(nightImages.anotherWeather, dayImages.anotherWeather);
            break;
    }
    return myjson;
}

function updateDailyRowImages(myjson) {
    for (let i = 0; i <= nextFourDays; i++) {
        renderDailyImages(i, myjson);
    }
    return myjson;
}

function updateDailyRowData(myjson) {
    for (let i = 0; i <= nextFourDays; i++) {
        let day = i * nextDayId;
        temp_max[day] = myjson.list[day].main.temp_max;
        temp_min[day] = myjson.list[day].main.temp_min;
        day_pressure[day] = myjson.list[day].main.pressure;
        next_date[0].innerHTML = 'Today';
        weekaday[day] = new Date(myjson.list[day].dt_txt);

        renderDailyData(i, day);
    }
}