//Словарь
let nightImages = {
    clear: 'img class=\'today-widget__icon\' src=\'img/38.png\'/',
    fewClouds: 'img class=\'today-widget__icon\' src=\'img/13.png\'/',
    rain: 'img class=\'today-widget__icon\' src=\'img/12.png\'/',
    snow: 'img class=\'today-widget__icon\' src=\'img/17.png\'/',
    thunderStorm: 'img class=\'today-widget__icon\' src=\'img/22.png\'/'
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
    anotherWeather: 'img class=\'today-widget__icon\' src=\'img/34.png\'/'
};

function isNight() {
    return (hour >= startNigth || hour <= endNight);
}



function renderClearImage() {
    if (isNight()) {
        today_img.innerHTML = `<${nightImages.clear}>`;
    } else {
        today_img.innerHTML = `<${dayImages.clear}>`;
    }

}
/*
function renderFewCloudsImage() {
    if (isNight()) {
        today_img.innerHTML = `<${nightImages.fewClouds}>`;
    } else
        today_img.innerHTML = `<${dayImages.fewClouds}>`;
}

function renderScatteredCloudsImage() {
    today_img.innerHTML = `<${dayImages.scatteredClouds}>`;
}

function renderBrokenCloudsImage() {
    today_img.innerHTML = `<${dayImages.brokenClouds}>`;
}

function renderRainImage() {
    if (isNight()) {
        today_img.innerHTML = `<${nightImages.rain}>`;
    } else
        today_img.innerHTML = `<${dayImages.rain}>`;
}

function renderSnowImage() {
    if (isNight()) {
        today_img.innerHTML = `<${nightImages.snow}>`;
    } else
        today_img.innerHTML = `<${dayImages.snow}>`;
}

function renderThunderImage() {
    if (isNight()) {
        today_img.innerHTML = `<${nightImages.thunderStorm}>`;
    } else
        today_img.innerHTML = `<${dayImages.thunderStorm}>`;
}

function renderDrizzleImage() {
    today_img.innerHTML = `<${dayImages.drizzle}>`;
}

function renderAtmosphereImage() {
    today_img.innerHTML = `<${dayImages.anotherWeather}>`;
}
*/
