const weatherForm = document.querySelector(`.weatherForm`);
const cityInput = document.querySelector(`.cityInput`);
const card = document.querySelector(`.card`);
const apikey = `c045ac3f9032a50978e6bd971cfab488`;

weatherForm.addEventListener(`submit`, async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError(`Please enter a city`);
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Could not fetch wearher data`);
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = ``;
  card.style.display = `flex`;

  const cityDisplay = document.createElement(`h1`);
  const tempDisplay = document.createElement(`p`);
  const humidityDisplay = document.createElement(`p`);
  const descDisplay = document.createElement(`p`);
  const weatherEmoji = document.createElement(`img`);

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.src = getWeatherEmoji(id);

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 233:
      return `https://openweathermap.org/img/wn/11d@2x.png`;
    case weatherId >= 300 && weatherId < 322:
      return `https://openweathermap.org/img/wn/09d@2x.png`;
    case weatherId >= 500 && weatherId < 505:
      return `https://openweathermap.org/img/wn/10d@2x.png`;
    case weatherId === 511:
      return `https://openweathermap.org/img/wn/13d@2x.png`;
    case weatherId >= 520 && weatherId < 532:
      return `https://openweathermap.org/img/wn/09d@2x.png`;
    case weatherId >= 600 && weatherId < 623:
      return `https://openweathermap.org/img/wn/13d@2x.png`;
    case weatherId >= 700 && weatherId < 782:
      return `https://openweathermap.org/img/wn/50d@2x.png`;
    case weatherId === 800:
      return `https://openweathermap.org/img/wn/01d@2x.png`;
    case weatherId === 801:
      return `https://openweathermap.org/img/wn/02d@2x.png`;
    case weatherId === 802:
      return `https://openweathermap.org/img/wn/03d@2x.png`;
    case weatherId >= 803 && weatherId < 805:
      return `https://openweathermap.org/img/wn/04d@2x.png`;
    default:
      return `?`;
  }
}

function displayError(message) {
  const errorDisplay = document.createElement(`p`);
  errorDisplay.textContent = message;
  card.textContent = ``;
  card.style.display = `flex`;
  card.appendChild(errorDisplay);
}
