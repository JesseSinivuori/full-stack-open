import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";
import { getWeather } from "./services/weather";

export type CountryT = {
  name: {
    common: string;
  };
  capital: string;
  area: number;
  languages: object;
  flags: {
    png: string;
  };
  latlng: number[];
};

export type Weather = {
  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    icon: string;
  }[];
};

function App() {
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<CountryT[]>([]);
  const selectedCountry = filteredCountries.find(
    (country) => country.name.common.toLowerCase() === selectedCountryName
  );
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    const response = axios.get(`https://restcountries.com/v3.1/all`); //or http://localhost:3001/countries
    response
      .then((response) => response.data)
      .then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [countries, filter]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountryName(filteredCountries[0].name.common.toLowerCase());
    }
  }, [filteredCountries, selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      setFilteredCountries([selectedCountry]);
      getWeather(selectedCountry).then((weather) => setWeather(weather));
    }
  }, [selectedCountry]);

  return (
    <div>
      find countries{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filter !== "" && (
        <div>
          {filteredCountries.length < 10 ? (
            filteredCountries.map((country) => (
              <Country
                key={country.name.common}
                country={country}
                expand={filteredCountries.length === 1}
                setSelectedCountryName={setSelectedCountryName}
                weather={weather}
              />
            ))
          ) : (
            <p>Too many matches, specify another filter</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
