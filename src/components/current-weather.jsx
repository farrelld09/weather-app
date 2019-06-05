import React from "react";

export const CurrentWeather = props => {
  const weather = props.weather.data;
  if (weather) {
    return (
      <div>
        <span>Today's Current Weather</span>
        <span>City: {weather.name} </span>
        <br />
        <span>Temp: {weather.main.temp}</span>
        <br />
        <span>High: {weather.main.temp_max}</span>
        <br />
        <span>Low: {weather.main.temp_min}</span>
        <br />
        <span>Description: {weather.weather[0].main}</span>
        <br />
      </div>
    );
  }
  return (
    <div>
      <span>Today's Current Weather</span>
      <span>{props.weather == [] ? "" : props.weather}</span>
    </div>
  );
};
