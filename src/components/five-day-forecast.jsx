import React from "react";
import moment from "moment";
import { daysOfTheWeek } from "./constants";

export const FiveDayForecast = props => {
  const weather = props.weather.data;
  if (weather) {
    const fiveDayForecast = weather.list.filter((day, i) => {
      if (i % 8 === 0) {
        return day;
      }
    });
    const mapDaysToHTML = fiveDayForecast.map(day => {
      const dayOfWeek = moment(day.dt_txt).day();
      return (
        <div className="card col-2" key={day.dt}>
          <div className="card-body" id="stat-line">
            <span id="day">{`${daysOfTheWeek[dayOfWeek]}'s Forecast`}</span>
            <br />
            <span>City: {weather.city.name}</span>
            <br />
            <span>High: {day.main.temp_max}</span>
            <br />
            <span>Low: {day.main.temp_min}</span>
            <br />
            <span>Description: {day.weather[0].main}</span>
            <br />
          </div>
        </div>
      );
    });
    return (
      <>
        <h3>Five Day Forecast (between 6pm and 9pm)</h3>
        <div className="row">{mapDaysToHTML}</div>
      </>
    );
  }
  return (
    <div style={{ margin: "1em" }}>
      <h3>Five Day Forecast</h3>
      <span>{props.weather === [] ? "" : props.weather}</span>
    </div>
  );
};
