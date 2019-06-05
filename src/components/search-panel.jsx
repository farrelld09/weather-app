import React from "react";
import { getWeatherByZip } from "../api/weather-api";
import { currentWeather, CurrentWeather } from "./current-weather";
import { FiveDayForecast } from "./five-day-forecast";

export class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perspective: "current"
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async function() {
    let result = await getWeatherByZip();
    this.setState({ weather: result.data });
  };

  toggleForecast = () => {
    const { perspective } = this.state;
    this.setState({
      perspective: perspective === "current" ? "fiveday" : "current"
    });
  };

  render() {
    console.log(this.state);
    let perspective =
      this.state.perspective === "current" ? (
        <CurrentWeather />
      ) : (
        <FiveDayForecast />
      );
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <h1>Search for Weather Forecast</h1>
          </div>
        </div>
        <button onClick={this.toggleForecast}>Toggle Forecast</button>
        <div className="row">
          <div className="col-lg">{perspective}</div>
        </div>
      </div>
    );
  }
}
