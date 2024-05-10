const APIKey = '8ee7c550c76a48a889b124044240905'
const testLocation = 'north port'
const city = document.querySelector('.location')
const condition = document.querySelector('.condition')
const temperature = document.querySelector('.temperature')
const feelsLike = document.querySelector('.feels-like')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

async function getWeatherData(key, location) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`);
        const weatherData = await response.json()
        city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`
        condition.textContent = weatherData.current.condition.text;
        temperature.textContent = weatherData.current.temp_f
        feelsLike.textContent = weatherData.current.feelslike_f
        wind.textContent = weatherData.current.wind_mph + 'MPH'
        humidity.textContent = weatherData.current.humidity + '%'
    } catch (err) {
        console.log('Location not found.')
        console.log(err)
    }
}

getWeatherData(APIKey, testLocation)



