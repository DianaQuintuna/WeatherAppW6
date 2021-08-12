//Feature 1
function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let dayIndex = date.getDay();
    let monthIndex = date.getMonth();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let Months = [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let day = days[dayIndex];
    let month = Months[monthIndex];
    return ` ${month} ${day} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  
  dateElement.innerHTML = formatDate(currentTime);
  
  function displayWeatherCondition(response) {
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#Wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#typeofday").innerHTML =
      response.data.weather[0].main;
  }

  //Goal of this function is to load a city when it first loads
  function searchCity(city) {
    let apiKey = "54f42e07e88440086f3f569842063f49";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(displayWeatherCondition);
  }

  //Goal of this section is to change the weather icon to the corresponding weather 
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute= ("src",`http://openweathermap.org/img/wn/04d@2x.png`);
  
  //Goal of this function is to allow the user to type whatever city they want
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  function searchLocation(position) {
    let apiKey = "54f42e07e88440086f3f569842063f49";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    console.log(apiURL);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let searchForm = document.querySelector("#search-form");
  
  searchForm.addEventListener("submit", handleSubmit);
  
  let Currentlocationbutton = document.querySelector("#Current-location-button");
  Currentlocationbutton.addEventListener("click", getCurrentLocation);
  searchCity("New York");
  