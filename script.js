let history = [];


async function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  const apiKey = "a4e6c536703b4c89381857e218f02a4a";

  if (city === "") {
    result.innerHTML = "Please enter a city ❗";
    return;
  }

  result.innerHTML = "Loading...";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      saveHistory(city);

      result.innerHTML = `
        <div class="card">
          <h2>${data.name}</h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
          <p><b>${data.main.temp} °C</b></p>
          <p>${data.weather[0].main}</p>
          <p>🌡 Feels like: ${data.main.feels_like} °C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind: ${data.wind.speed} km/h</p>
        </div>
      `;
    } else {
      result.innerHTML = "City not found ❌";
    }

  } catch (error) {
    result.innerHTML = "Error fetching data ";
  }
}


function getLocationWeather() {
  const result = document.getElementById("result");

  if (navigator.geolocation) {
    result.innerHTML = "Getting location...";

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const apiKey = "a4e6c536703b4c89381857e218f02a4a";

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      result.innerHTML = `
        <div class="card">
          <h2>${data.name}</h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
          <p><b>${data.main.temp} °C</b></p>
          <p>${data.weather[0].main}</p>
        </div>
      `;
    });
  } else {
    result.innerHTML = "Geolocation not supported ❌";
  }
}


function saveHistory(city) {
  history.push(city);

  document.getElementById("history").innerHTML =
    "<h3>Recent Searches</h3>" +
    history.map(c => `<p>${c}</p>`).join("");
}


function toggleDark() {
  document.body.classList.toggle("dark");
}


document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  });
});