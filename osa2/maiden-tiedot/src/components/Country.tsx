import { SetStateAction } from "react";
import { CountryT } from "../App";

const Country = ({
  country,
  expand,
  setSelectedCountryName,
}: {
  country: CountryT;
  expand: boolean;
  setSelectedCountryName: React.Dispatch<SetStateAction<string>>;
}) => {
  const handleShow = () => {
    setSelectedCountryName(country.name.common.toLowerCase());
  };

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
        </>
      )}
    </div>
  );
};

export default Country;
