import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountriesData = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const fetchWeatherData = async (capital) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

  const response = await axios.get(weatherUrl);
  return response.data;
};

export default getCountriesData;
export { fetchWeatherData };
