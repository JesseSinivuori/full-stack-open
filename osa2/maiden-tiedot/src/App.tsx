import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";

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
};

function App() {
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [filter, setFilter] = useState("fi");
  const [selectedCountryName, setSelectedCountryName] = useState("finland");
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const selectedCountry = filteredCountries.find(
    (country) => country.name.common.toLowerCase() === selectedCountryName
  );

  useEffect(() => {
    const response = axios.get(`http://localhost:3001/countries`); //https://restcountries.com/v3.1/all
    response
      .then((response) => response.data)
      .then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    setSelectedCountryName("");
  }, [filter]);

  return (
    <div>
      find countries{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filter !== "" && selectedCountryName === "" && (
        <div>
          {filteredCountries.length < 10 ? (
            filteredCountries.map((country) => (
              <Country
                key={country.name.common}
                country={country}
                expand={filteredCountries.length === 1}
                setSelectedCountryName={setSelectedCountryName}
              />
            ))
          ) : (
            <p>Too many matches, specify another filter</p>
          )}
        </div>
      )}
      {selectedCountry && (
        <Country
          key={selectedCountry.name.common}
          country={selectedCountry}
          expand={true}
          setSelectedCountryName={setSelectedCountryName}
        />
      )}
    </div>
  );
}

export default App;
