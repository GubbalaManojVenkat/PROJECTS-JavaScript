const apiKey = "aad7752333f2388a03f8475c9eca9e28"; // ✅ Your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    showWeather(data);
    errorMessage.textContent = "";
  } catch (error) {
    errorMessage.textContent = "City not found. Please try again!";
    document.body.className = ""; // Reset background
  }
}

function showWeather(data) {
  const temp = data.main.temp;
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${temp.toFixed(1)} °C`;
  description.textContent = desc.toUpperCase();
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Change background based on weather
  if (desc.includes("sun")) {
    document.body.className = "sunny";
  } else if (desc.includes("cloud")) {
    document.body.className = "cloudy";
  } else if (desc.includes("rain")) {
    document.body.className = "rainy";
  } else if (temp < 15) {
    document.body.className = "cold";
  } else {
    document.body.className = "warm";
  }
}
