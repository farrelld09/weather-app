import axios from "axios";
import { apiKey } from "./api-key";

export function getWeatherByZip() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=London&APPID=${apiKey}`
  );
}
