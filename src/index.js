//Feature 1

function formatDate(timestamp) {
  //calculate the time 
  let date =new Date(timestamp);
  let hours = date.getHours();
if (hours < 10){
  hours =`0${hours}`;
}
  let minutes = date.getMinutes();
if(minutes < 10) {
minutes = `0${minutes}`; 
}
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

  //This is to have the names of the day appear 

  function formatDay(timestamp){
    let date = new Date(timestamp*1000); 
    let day = date.getDay();
    let days = ["Sun", "Mon","Tue","Wed","Thur","Fri","Sat"];

    return days[day];
  }
  //fix try for changing the days of the week 2/28/22, this is to have the 7 days appearing in a row
  
  function displayForecast(response){
    let forecast =response.data.daily;

    let forecastElement = document.querySelector("#forecast"); 

    let forecastHTML = `<div class="row">`; 
    
    forecast.forEach(function (forecastDay, index){
      if (index < 6){
      forecastHTML =
     forecastHTML +
     `
    <div class="col">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="60"/>
      
      <div class ="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
      ${Math.round(forecastDay.temp.max)}˚</span>
      <span class="weather-forecast-temperature-min">
        ${Math.round(forecastDay.temp.min)}˚
      </span>
      </div>
      </div>
      
  
    `;
    
  }
    
    });



    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

  }
    
//This is to change the temp of daily forecast 
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "54f42e07e88440086f3f569842063f49";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
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
    //Temperature variable to convert it to celsius 
    fahrenheitTemperature = response.data.main.temp;

  //To change the wind speed/humidity 
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#typeofday").innerHTML =
    response.data.weather[0].main;

//Goal of this section is to change the weather icon to the corresponding weather 
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

//This is the API call to change the days of the week forecast 
getForecast(response.data.coord);
}

//Goal of this function is to load a city when it first loads
function search(city) {
  let apiKey = "54f42e07e88440086f3f569842063f49";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayWeatherCondition);

}


//Goal of this function is to allow the user to type whatever city they want
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
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


//New York is the default city that appears when the app is first loaded 
search("New York");

//This also changes the main temp in bold in the weather app both conversion blocks 
//Conversion to Celsius 
function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = (fahrenheitTemperature-32)*(5/9);
  //let celsiusTemperature = (temperatureElement.innerHTML-32)*(5/9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//Coversion to Fahrenheit 
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let  fahrenheitTemperature = null;  


//This is to search for the information of the city that is typed in 
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//When you click on the Celsius 
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//When you click on the Fahrenheit 
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);