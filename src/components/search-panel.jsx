import React from "react";
import {
  getCurrentWeatherByCity,
  getFiveDayForecastByZip,
  getCurrentWeatherByZip,
  getFiveDayForecastByCity,
  getCurrentWeatherByCoordinates,
  getFiveDayForecastByCoordinates
} from "../api/weather-api";
import { CurrentWeather } from "./current-weather";
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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getCurrentLocation);
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
      units: units === "imperial" ? "metric" : "imperial"
    });
  };

  getCurrentLocation = async position => {
    const answer = window.confirm("Get weather for your current location?");
    if (answer) {
      const currentWeather = await getCurrentWeatherByCoordinates(
        position.coords.latitude,
        position.coords.longitude,
        this.state.units
      );
      const fiveDayWeather = await getFiveDayForecastByCoordinates(
        position.coords.latitude,
        position.coords.longitude,
        this.state.units
      );
      this.setState({
        currentWeather: currentWeather,
        fiveDayWeather: fiveDayWeather
      });
    }
  };

  render() {
    let perspective =
      this.state.perspective === "current" ? (
        <CurrentWeather weather={this.state.currentWeather} />
      ) : (
        <FiveDayForecast weather={this.state.fiveDayWeather} />
      );

    return (
      <div
        className="container"
        style={{
          position: "relative",
          backgroundColor: "#F3F3F3",
          marginTop: "1em"
        }}
      >
        <div className="row">
          <div className="col-12">
            <h1 className="mx-auto title">Weather App</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 btn-group" role="group">
            <button
              className={
                this.state.perspective === "current"
                  ? "btn btn-primary btn-lg weather-mode"
                  : "btn btn-outline-primary btn-lg weather-mode"
              }
              onClick={this.toggleForecast}
            >
              Today's Current Weather
            </button>
            <button
              type="button"
              className={
                this.state.perspective !== "current"
                  ? "btn btn-primary btn-lg weather-mode"
                  : "btn btn-outline-primary btn-lg weather-mode"
              }
              onClick={this.toggleForecast}
            >
              Five Day Forecast
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-8 btn-group">
            <button
              type="button"
              onClick={this.toggleUnits}
              className={
                this.state.units === "imperial"
                  ? "btn btn-primary btn-lg weather-mode"
                  : "btn btn-outline-primary btn-lg weather-mode"
              }
            >
              Fahrenheit
            </button>
            <button
              type="button"
              onClick={this.toggleUnits}
              className={
                this.state.units !== "imperial"
                  ? "btn btn-primary btn-lg weather-mode"
                  : "btn btn-outline-primary btn-lg weather-mode"
              }
            >
              Celsius
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label for="zip">Zip Code</label>
            <br />
            <input type="text" id="zip" style={{ height: "2em" }} />
            <button
              style={{ height: "2.4em", marginLeft: "1em" }}
              className="btn btn-primary btn-sm"
              onClick={this.getWeatherByZip}
            >
              Search
            </button>
          </div>
          <div className="col-4">
            <label for="city">City</label>
            <br />
            <input type="text" id="city" style={{ height: "2em" }} />
            <button
              style={{ height: "2.4em", marginLeft: "1em" }}
              className="btn btn-primary btn-sm"
              onClick={this.getWeatherByCity}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">{perspective}</div>
        </div>
      </div>
    );
  }
}
