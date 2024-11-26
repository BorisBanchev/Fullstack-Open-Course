import React, { useState, useEffect } from "react";
import countriesService from "./services/countries";

const Search = ({ text, handleSearchChange, value }) => {
  return (
    <div>
      {text} <input type="text" value={value} onChange={handleSearchChange} />
    </div>
  );
};

const Country = ({ country, showAllData }) => {
  if (showAllData !== true) {
    return (
      <div>
        <p>{country.name.common}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <br />
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <b>languages:</b>
        <br />
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width={150} />
      </div>
    );
  }
};

const Countries = ({ countries, matchingCountries, filteredCountries }) => {
  let showAllData = false;
  if (matchingCountries === "Too many matches, specify another filter") {
    return <div>Too many matches, specify another filter</div>;
  } else if (matchingCountries === "Show countries") {
    return (
      <div>
        {filteredCountries.map((country, index) => (
          <Country
            country={country}
            showAllData={showAllData}
            key={index}
          ></Country>
        ))}
      </div>
    );
  } else {
    showAllData = true;
    return (
      <div>
        {filteredCountries.map((country, index) => (
          <Country
            country={country}
            showAllData={showAllData}
            key={index}
          ></Country>
        ))}
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const matchingCountries = ({ filteredCountries }) => {
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
      {" "}
      <Search
        text="find countries"
        handleSearchChange={handleSearchChange}
        value={search}
      ></Search>{" "}
      <Countries
        countries={countries}
        matchingCountries={matchingCountries({ filteredCountries })}
        filteredCountries={filteredCountries}
      ></Countries>
    </div>
  );
};

export default App;
