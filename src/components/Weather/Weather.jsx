import React, { useState } from "react";
import "./weather.css";
import clear_icon from "../assests/clear.png";
import cloud_icon from "../assests/cloud.png";
import drizzle_icon from "../assests/drizzle.png";
import humidity_icon from "../assests/humidity.png";
import rain_icon from "../assests/rain.png";
import search_icon from "../assests/search.png";
import snow_icon from "../assests/snow.png";
import wind_icon from "../assests/wind.png";

const Weather = () => {
  const apiKey = "4872786526f34d35bf1463615b0f1d9f";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
      location[0].innerHTML = data.name;

      const weatherIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": drizzle_icon,
        "03n": drizzle_icon,
        "04d": cloud_icon,
        "04n": cloud_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
      };

      setWicon(weatherIcons[data.weather[0].icon] || clear_icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="search_icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="weather_icon" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity_icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind_icon" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
