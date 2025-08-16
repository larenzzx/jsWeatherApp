const form = document.getElementById("weatherForm");
const input = document.getElementById("cityInput");
const loading = document.getElementById("load");
const weatherResult = document.getElementById("weatherResult");
const weatherIcon = document.getElementById("weatherIcon");
const cityName = document.getElementById("cityName");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temperature");

const apiKey = "778d5ffdcd4c6c0738ed73f5867aa461";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim().toLowerCase();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(cityNameInput) {
  try {
    loading.classList.remove("hidden");
    weatherResult.classList.add("hidden");
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityNameInput
      )}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) {
      alert("city not found");
      input.value = "";
      loading.classList.add("hidden");
      weatherResult.classList.add("hidden");
    } else {
      const data = await res.json();
      loading.classList.add("hidden");
      weatherResult.classList.remove("hidden");
      const icon = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      cityName.textContent = data.name;
      condition.textContent = `Condition: ${data.weather[0].description}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
    }
  } catch (error) {
    console.error("city not found", error);
  }
}
