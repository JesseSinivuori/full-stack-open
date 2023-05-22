import axios from "axios";
import { CountryT } from "../App";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async (country: CountryT) => {
  const lat = country.latlng[0];
  const lon = country.latlng[1];

  const response = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
    .then((response) => response.data);
  return response;
};
export { getWeather };
