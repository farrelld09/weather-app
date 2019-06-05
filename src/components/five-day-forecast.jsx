import React from "react";
import moment from "moment";
import { daysOfTheWeek } from "./constants";

export const FiveDayForecast = props => {
  console.log("props", props);
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
        <div className="card col-md-4 col-lg-4" key={day.dt}>
          <div className="card-body" id="stat-line">
            <span>{`${daysOfTheWeek[dayOfWeek]}'s Forecast`}</span>
            <br />
            <span>Temp: {day.main.temp}</span>
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
    console.log("fiveDayForecast", fiveDayForecast);
    return (
      <>
        <h3>Five Day Forecast (between 6pm and 9pm)</h3>
        <div className="row">{mapDaysToHTML}</div>
      </>
    );
  }
  return (
    <div>
      <span>Five Day Forecast</span>
      <span>{props.weather == [] ? "" : props.weather}</span>
    </div>
  );
};
