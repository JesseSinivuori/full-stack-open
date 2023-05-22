import { SetStateAction } from "react";
import { CountryT, Weather } from "../App";

const Country = ({
  country,
  expand,
  setSelectedCountryName,
  weather,
}: {
  country: CountryT;
  expand: boolean;
  setSelectedCountryName: React.Dispatch<SetStateAction<string>>;
  weather: Weather | undefined;
}) => {
  const temperatureInCelcius =
    weather && (weather.main.temp - 273.15).toFixed(2);

  const handleShow = () => {
    setSelectedCountryName(country.name.common.toLowerCase());
  };
  console.log(weather);
  return (
    <div>
      {!expand && (
        <div>
          <p>
            {country.name.common}
            <button type="button" onClick={handleShow}>
              show
            </button>
          </p>
        </div>
      )}
      {expand && (
        <>
          <h1>{country.name.common}</h1>
          <p>capital: {country.capital}</p>
          <p>area: {country.area}</p>
          <h2>languages</h2>
          <ul>
            {Object.entries(country.languages).map((language) => (
              <li key={language[1]}>{language[1]}</li>
            ))}
          </ul>
          <img src={country.flags.png} />
          {weather && (
            <>
              <h2>Weather in {country.capital}</h2>
              <p>temperature: {temperatureInCelcius} celcius</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              <p>wind: {weather.wind.speed}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Country;
