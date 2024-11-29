import React, { useState, useEffect } from "react";
import countriesService from "./services/countries";

const Search = ({ text, handleSearchChange, value }) => {
  return (
    <div>
      {text} <input type="text" value={value} onChange={handleSearchChange} />
    </div>
  );
};

const Country = ({ country, showAllData, handleShowButton }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (showAllData) {
      const capital = country.capital[0];
      countriesService
        .getWeatherByCapital(capital)
        .then((weatherData) => {
          setWeather({
            temperature: (weatherData.data.main.temp - 273.15).toFixed(2),
            windSpeed: weatherData.data.wind.speed,
            icon: weatherData.data.weather[0].icon,
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error.message);
        });
    }
  }, [showAllData, country]);

  if (!showAllData) {
    return (
      <div>
        {country.name.common}{" "}
        <button onClick={() => handleShowButton(country)}>show</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width={150} />
        <h2>Weather in {country.capital[0]}</h2>
        {weather ? (
          <>
            <p>temperature: {weather.temperature} Celsius</p>
            {weather.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="Weather icon"
                width={80}
              />
            )}
            <p>wind: {weather.windSpeed} m/s</p>
          </>
        ) : (
          <p>Weather data not available</p>
        )}
      </div>
    );
  }
};

const Countries = ({
  filteredCountries,
  matchingCountries,
  selectedCountry,
  handleShowButton,
}) => {
  if (matchingCountries === "Too many matches, specify another filter") {
    return <div>Too many matches, specify another filter</div>;
  }

  if (selectedCountry) {
    return (
      <Country
        country={selectedCountry}
        showAllData={true}
        handleShowButton={handleShowButton}
      />
    );
  }

  if (matchingCountries === "Show countries") {
    return (
      <div>
        {filteredCountries.map((country, index) => (
          <Country
            key={index}
            country={country}
            showAllData={false}
            handleShowButton={handleShowButton}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {filteredCountries.map((country, index) => (
        <Country
          key={index}
          country={country}
          showAllData={true}
          handleShowButton={handleShowButton}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowButton = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const matchingCountries = () => {
    if (filteredCountries.length > 10) {
      return "Too many matches, specify another filter";
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return "Show countries";
    } else {
      return "Show one country";
    }
  };

  return (
    <div>
      <Search
        text="find countries"
        handleSearchChange={handleSearchChange}
        value={search}
      />
      <Countries
        filteredCountries={filteredCountries}
        matchingCountries={matchingCountries()}
        selectedCountry={selectedCountry}
        handleShowButton={handleShowButton}
      />
    </div>
  );
};

export default App;
