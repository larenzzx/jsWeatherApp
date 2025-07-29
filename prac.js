const form = document.getElementById("weatherForm");
const input = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loadingMessage = document.getElementById("load");
const weatherIcon = document.getElementById("weatherIcon");
const cityName = document.getElementById("cityName");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temperature");

const apiKey = "778d5ffdcd4c6c0738ed73f5867aa461";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityInput = input.value.trim();
  if (cityInput) {
    getWeather(cityInput);
  }
});

function getWeather(city) {
  loadingMessage.classList.remove("hidden");
  weatherResult.classList.add("hidden");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found. Try again");
      }
      return res.json();
    })
    .then((data) => {
      loadingMessage.classList.add("hidden");
      weatherResult.classList.remove("hidden");
      let icon = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      cityName.textContent = data.name;
      condition.textContent = `Condition: ${data.weather[0].description}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      
    })
    .catch((error) => {
      loadingMessage.classList.add("hidden");
      console.error(error);
      alert(error.message);
      input.value = "";
    });
}
