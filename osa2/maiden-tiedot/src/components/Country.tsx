import { CountryT } from "../App";

const Country = ({
  country,
  expand,
}: {
  country: CountryT;
  expand: boolean;
}) => {
  return (
    <div>
      {!expand ? (
        <p>{country.name.common}</p>
      ) : (
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
