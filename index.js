const APIKey = '8ee7c550c76a48a889b124044240905'
const defaultLocation = 'san diego'
const city = document.querySelector('.location')
const condition = document.querySelector('.condition')
const temperature = document.querySelector('.temperature')
const feelsLike = document.querySelector('.feels-like')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const searchBar = document.querySelector('input')
const submitButton = document.querySelector('.submit-button > svg');
const errorMessage = document.querySelector('span.error')
const form = document.querySelector('form')

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    let valid = true;
    if (searchBar.validity.tooShort || searchBar.value.length == 0) {
        errorMessage.innerHTML = 'Not enough characters.'
    } else if (valid == true) {
        try {
            errorMessage.innerHTML = '';
            await getWeatherData(APIKey, searchBar.value);
            if (errorMessage.innerHTML == '') {
                form.reset();
            }
        } catch (error) {
            errorMessage.innerHTML = 'Location not found.';
        }
    }
});

async function getWeatherData(key, location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`);
    if (!response.ok) {
        throw new Error('Location not found.');
    }
    const weatherData = await response.json();
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    condition.textContent = weatherData.current.condition.text;
    temperature.textContent = weatherData.current.temp_f;
    feelsLike.textContent = weatherData.current.feelslike_f;
    wind.textContent = weatherData.current.wind_mph + 'MPH';
    humidity.textContent = weatherData.current.humidity + '%';
}

// Default location on startup

getWeatherData(APIKey, defaultLocation)


