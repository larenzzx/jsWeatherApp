const weatherResult = document.getElementById("weatherResult");
const form = document.getElementById("weatherForm");
const input = document.getElementById("cityInput");
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
  const loadingMessage = document.getElementById("load");
  loadingMessage.classList.remove("hidden");
  weatherResult.classList.add("hidden");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("City can't be found");
      }
      return res.json();
    })
    .then((data) => {
      loadingMessage.classList.add("hidden");
      weatherResult.classList.remove("hidden");
      // let name = data.name;
      let icon = data.weather[0].icon;
      let iconWeather = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      cityName.textContent = data.name;
      weatherIcon.src = iconWeather;
      condition.textContent = `Condition: ${data.weather[0].description}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
    })
    .catch((error) => {
      alert(error.message);
      loadingMessage.classList.add("hidden");
      console.error(error);
      input.value = "";
    });
}
