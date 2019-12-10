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
let startNigth = 21;
let endNight = 3;

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

cities.childNodes.forEach(city => {
    let label = city.id;
    city.addEventListener('click', () => {
        updatecity(label);
    });
});

//eventTarget

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
        .then(updateImg)
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

function updateImg(myjson) {
    const today_weather = myjson.list[0].weather[0].id;
    const weatherId = Math.trunc(today_weather / 100);

    switch (today_weather) {
        case clearWeather:
            renderClearImage();
            break;
        case fewClouds:
            renderFewCloudsImage();
            break;
        case scatteredClouds:
            renderScatteredCloudsImage();
            break;
        case (overcastClouds):
            renderBrokenCloudsImage();
            break;
        case (brokenClouds):
            renderBrokenCloudsImage();
            break;
    }

    switch (weatherId) {
        case drizzle:
            renderDrizzleImage();
            break;
        case rainId:
            renderRainImage();
            break;
        case thunderStorm:
            renderThunderImage();
            break;
        case snowId:
            renderSnowImage();
            break;
        case atmosphere:
            renderAtmosphereImage();
            break;
    }


    /*if (today_weather === clearWeather) {
        renderClearImage();
    } else if (today_weather === fewClouds) {
        renderFewCloudsImage();
    } else if (today_weather === scatteredClouds) {
        renderScatteredCloudsImage();
    } else if (today_weather === brokenClouds || today_weather === overcastClouds) {
        renderBrokenCloudsImage();
    } else if (weatherId === drizzle) {
        renderDrizzleImage();
    } else if (weatherId === rainId) {
        renderRainImage();
    } else if (weatherId === thunderStorm) {
        renderThunderImage();
    } else if (weatherId === snowId) {
        renderSnowImage();
    } else if (weatherId === atmosphere) {
        renderAtmosphereImage();
    }*/

    return myjson;
}

function updateDailyRowImages(myjson) {
    for (var i = 0; i <= 32; i += 8) {
        for (var j = 0; j <= 4; j++) {
            weather_id[i] = myjson.list[i].weather[0].id;

            if (weather_id[i] == 800 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/33.png\'/>';
            } else if (weather_id[i] == 801 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/32.png\'/>';
            } else if (weather_id[i] == 802 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/37.png\'/>';
            } else if (
                (weather_id[i] == 803 || weather_id[i] == 804) &&
                j * 8 == i
            ) {
                img[j].innerHTML =
                    '<img class=\'daily-row__icon\' src=\'img/37_1.png\'/>';
            } else if (Math.trunc(weather_id[i] / 100) == 3 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/34.png\'/>';
            } else if (Math.trunc(weather_id[i] / 100) == 5 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__iconn\' src=\'img/25.png\'/>';
            } else if (Math.trunc(weather_id[i] / 100) == 2 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/27.png\'/>';
            } else if (Math.trunc(weather_id[i] / 100) == 6 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/24.png\'/>';
            } else if (Math.trunc(weather_id[i] / 100) == 7 && j * 8 == i) {
                img[j].innerHTML = '<img class=\'daily-row__icon\' src=\'img/21.png\'/>';
            }
        }
    }
    return myjson;
}

function updateDailyRowData(myjson) {
    for (var i = 0; i <= 32; i += 8) {
        for (var j = 0; j <= 4; j++) {
            temp_max[i] = myjson.list[i].main.temp_max;
            temp_min[i] = myjson.list[i].main.temp_min;
            day_pressure[i] = myjson.list[i].main.pressure;
            next_date[0].innerHTML = 'Today';
            weekaday[i] = new Date(myjson.list[i].dt_txt);
            if (j * 8 == i) {
                degree_high[j].innerHTML = Math.round(temp_max[i]) + '°';
                degree_min[j].innerHTML = Math.round(temp_min[i]) + '°';
                daily_pressure[j].innerHTML =
                    '<p>Pressure: ' + Math.round(day_pressure[i]) + ' hPA</p> ';
                next_date[j].innerHTML = weekaday[i].toLocaleString('en', {
                    weekday: 'long'
                });
            }
        }
    }
}
