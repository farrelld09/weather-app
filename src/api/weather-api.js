import axios from "axios";
import { apiKey } from "./api-key";

export function getCurrentWeatherByCity(city, units) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      return "Invalid Search";
    });
}

export function getCurrentWeatherByZip(zip, units) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${apiKey}&units=${units}`
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      return "Invalid Search";
    });
}

export function getFiveDayForecastByCity(city, units) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}&units=${units}`
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      return "Invalid Search";
    });
}

export function getFiveDayForecastByZip(zip, units) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${apiKey}&units=${units}`
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      return "Invalid Search";
    });
}
