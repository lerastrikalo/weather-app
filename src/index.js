function formatDate(date) {
  let currentDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = currentDays[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

let currentDate = new Date();
let dayTime = document.querySelector("#currentDayTime");

dayTime.innerHTML = formatDate(currentDate);

function searchCity(city) {
  let apiKey = `8c78e9e7e9928cd1a2a6f923072c3dec`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Kyiv");

function showPosition(position) {
  let apiKey = `8c78e9e7e9928cd1a2a6f923072c3dec`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocation = document.querySelector(".button-location");
myLocation.addEventListener("click", getLocation);
