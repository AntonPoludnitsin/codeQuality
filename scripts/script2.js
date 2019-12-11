let nightImages = {
    clear: 'img class=\'today-widget__icon\' src=\'img/38.png\'/',
    fewClouds: 'img class=\'today-widget__icon\' src=\'img/13.png\'/',
    scatteredClouds: 'img class=\'today-widget__icon\' src=\'img/37.png\'/',
    brokenClouds: 'img class=\'today-widget__icon\' src=\'img/37_1.png\'/',
    rain: 'img class=\'today-widget__icon\' src=\'img/12.png\'/',
    snow: 'img class=\'today-widget__icon\' src=\'img/17.png\'/',
    thunderStorm: 'img class=\'today-widget__icon\' src=\'img/22.png\'/',
    drizzle: 'img class=\'today-widget__icon\' src=\'img/34.png\'/',
    anotherWeather: 'img class=\'today-widget__icon\' src=\'img/21.png\'/'
};

let dayImages = {
    clear: 'img class=\'today-widget__icon\' src=\'img/33.png\'/',
    fewClouds: 'img class=\'today-widget__icon\' src=\'img/32.png\'/',
    scatteredClouds: 'img class=\'today-widget__icon\' src=\'img/37.png\'/',
    brokenClouds: 'img class=\'today-widget__icon\' src=\'img/37_1.png\'/',
    rain: 'img class=\'today-widget__icon\' src=\'img/25.png\'/',
    snow: 'img class=\'today-widget__icon\' src=\'img/24.png\'/',
    thunderStorm: 'img class=\'today-widget__icon\' src=\'img/27.png\'/',
    drizzle: 'img class=\'today-widget__icon\' src=\'img/34.png\'/',
    anotherWeather: 'img class=\'today-widget__icon\' src=\'img/21.png\'/'
};

function isNight() {
    return (hour >= startNigth || hour <= endNight);
}

function renderImageWeather(nigthImage, dayImage) {
    if (isNight()) {
        today_img.innerHTML = `<${nigthImage}>`;
    } else {
        today_img.innerHTML = `<${dayImage}>`;
    }
}

function renderDailyImages(i, myjson) {
    let day = i * nextDayId;
    weather_id[day] = myjson.list[day].weather[0].id;
    const weatherDaily = Math.trunc(weather_id[day] / 100);

    switch (weather_id[day]) {
        case clearWeather:
            img[i].innerHTML = `<${dayImages.clear}>`;
            break;
        case fewClouds:
            img[i].innerHTML = `<${dayImages.fewClouds}>`;
            break;
        case scatteredClouds:
            img[i].innerHTML = `<${dayImages.scatteredClouds}>`;
            break;
        case brokenClouds:
            img[i].innerHTML = `<${dayImages.brokenClouds}>`;
            break;
        case overcastClouds:
            img[i].innerHTML = `<${dayImages.brokenClouds}>`;
            break;
    }

    switch (weatherDaily) {
        case drizzle:
            img[i].innerHTML = `<${dayImages.drizzle}>`;
            break;
        case rainId:
            img[i].innerHTML = `<${dayImages.rain}>`;
            break;
        case thunderStorm:
            img[i].innerHTML = `<${dayImages.thunderStorm}>`;
            break;
        case snowId:
            img[i].innerHTML = `<${dayImages.snow}>`;
            break;
        case atmosphere:
            img[i].innerHTML = `<${dayImages.atmosphere}>`;
            break;
    }
}

function renderDailyData(i, day) {
    degree_high[i].innerHTML = Math.round(temp_max[day]) + '°';
    degree_min[i].innerHTML = Math.round(temp_min[day]) + '°';
    daily_pressure[i].innerHTML =
        '<p>Pressure: ' + Math.round(day_pressure[day]) + ' hPA</p> ';
    next_date[i].innerHTML = weekaday[day].toLocaleString('en', {
        weekday: 'long'
    });
}
