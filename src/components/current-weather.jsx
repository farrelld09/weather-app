import React from "react";

export const CurrentWeather = props => {
  const weather = props.weather.data;
  let content = "";
  if (weather) {
    content = (
      <div className="card col-2">
        <div className="card-body" id="stat-line">
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
      </div>
    );
  }
  return (
    <div style={{ margin: "1em" }}>
      <h3>Current Weather</h3>
      {content ? content : props.weather}
    </div>
  );
};
