import React from "react";
import {
  getWeatherByZip,
  getWeatherByCity,
  getCurrentWeatherByCity,
  getFiveDayForecastByZip,
  getCurrentWeatherByZip,
  getFiveDayForecastByCity
} from "../api/weather-api";
import { currentWeather, CurrentWeather } from "./current-weather";
import { FiveDayForecast } from "./five-day-forecast";

export class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perspective: "current",
      currentWeather: [],
      fiveDayWeather: [],
      units: "imperial"
    };
  }

  getWeatherByZip = async () => {
    const zip = document.getElementById("zip").value;
    document.getElementById("city").value = "";
    const currentWeather = await getCurrentWeatherByZip(zip, this.state.units);
    const fiveDayWeather = await getFiveDayForecastByZip(zip, this.state.units);
    this.setState({
      currentWeather: currentWeather,
      fiveDayWeather: fiveDayWeather
    });
  };

  getWeatherByCity = async () => {
    const city = document.getElementById("city").value;
    document.getElementById("zip").value = "";
    console.log("city", city);
    const currentWeather = await getCurrentWeatherByCity(
      city,
      this.state.units
    );
    const fiveDayWeather = await getFiveDayForecastByCity(
      city,
      this.state.units
    );
    this.setState({
      currentWeather: currentWeather,
      fiveDayWeather: fiveDayWeather
    });
  };

  toggleForecast = () => {
    const { perspective } = this.state;
    this.setState({
      perspective: perspective === "current" ? "metric" : "current"
    });
  };

  toggleUnits = () => {
    const { units } = this.state;
    this.setState({
      units: units === "imperial" ? "fiveday" : "imperial"
    });
  };

  render() {
    console.log(this.state);
    let perspective =
      this.state.perspective === "current" ? (
        <CurrentWeather weather={this.state.currentWeather} />
      ) : (
        <FiveDayForecast weather={this.state.fiveDayWeather} />
      );

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <h1>Weather App</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <button
              onClick={this.toggleForecast}
              style={
                this.state.perspective === "current"
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              Today's Current Weather
            </button>
            <br />
            <button
              onClick={this.toggleUnits}
              style={
                this.state.units === "imperial"
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              Fahrenheit
            </button>
          </div>
          <div className="col-3">
            <button
              onClick={this.toggleForecast}
              style={
                this.state.perspective !== "current"
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              Five Day Forecast
            </button>
            <br />
            <button
              onClick={this.toggleUnits}
              style={
                this.state.units !== "imperial"
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              Celcius
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <h6>Zip Code</h6>
            <input type="text" id="zip" />
            <button
              onClick={this.getWeatherByZip}
              onFocus={() => (this.value = "")}
            >
              Search by Zip Code
            </button>
          </div>
          <div className="col-lg">
            <h6>City Name</h6>
            <input type="text" id="city" />
            <button onClick={this.getWeatherByCity}>Search by City Name</button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">{perspective}</div>
        </div>
      </div>
    );
  }
}
