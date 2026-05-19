import { useEffect, useState } from "react";
import getCountriesData, { fetchWeatherData } from "./Services.jsx";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [weather, setWeather] = useState({
    temperature: "",
    wind: "",
    icon: "",
  });

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    async function fetchCountries() {
      try {
        const data = await getCountriesData();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (filteredCountries.length !== 1) return;
    const capital = filteredCountries[0].capital;

    async function fetchWeather() {
      try {
        const data = await fetchWeatherData(capital);
        setWeather({
          temperature: data.main.temp,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        });
      } catch (error) {
        setError(error.message);
      }
    }

    fetchWeather();
  }, [searchQuery]);
  return (
    <div>
      <label htmlFor="text">Find countries</label>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        id="text"
      />

      {searchQuery && filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter!</p>
      )}
      {searchQuery &&
        filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => {
          return (
            <div key={country.cca2}>
              <p>{country.name.common}</p>
              <button
                onClick={() => {
                  setCountryId(
                    countryId === country.cca2 ? null : country.cca2,
                  );
                }}
              >{`${countryId === country.cca2 ? "Hide" : "Show"}`}</button>
              {countryId === country.cca2 && (
                <div>
                  <h1>{country.name.common}</h1>
                  <p>
                    <b>Capital</b> : {country.capital}
                  </p>
                  <p>
                    <b>Area</b> : {country.area}
                  </p>
                  <h2>Languages</h2>
                  <ul>
                    {Object.values(country.languages).map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>

                  <img
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={country.flags.png}
                    alt="flag of the country"
                  />
                </div>
              )}
            </div>
          );
        })}
      {searchQuery && filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>
            <b>Capital</b> : {filteredCountries[0].capital}
          </p>
          <p>
            <b>Area</b> : {filteredCountries[0].area}
          </p>
          <h2>Languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            style={{ width: "10rem", height: "10rem", objectFit: "contain" }}
            src={filteredCountries[0].flags.png}
            alt="flag of the country"
          />
          <h3>Weather in {filteredCountries[0].name.common}</h3>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind: {weather.wind} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;
