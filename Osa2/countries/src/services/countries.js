import axios from "axios";
const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

const getAll = () => {
  const request = axios.get(apiUrl);
  return request.then((response) => response.data);
};

const getWeatherByCapital = (capital) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;

  const url = `${weatherApiUrl}?q=${capital}&appid=${apiKey}`;
  try {
    const response = axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};

export default {
  getAll: getAll,
  getWeatherByCapital: getWeatherByCapital,
};
