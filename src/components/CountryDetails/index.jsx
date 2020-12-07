import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import './styles.css';

const COUNTRY_DETAILS = gql`
  query Country($name: String!) {
	Country(name: $name) {
    name
    capital
    area
    population
    topLevelDomains {
      name
    }
    flag {
      emoji
      svgFile
    }
  }
}
`;

const CountryDetails = () => {
  const { name: countryName } = useParams();

  const [country, setCountry] = useState();
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    area: '',
    population: '',
    topLevelDomains: '',
  });

  const { loading, error, data } = useQuery(COUNTRY_DETAILS, {
    variables: { name: countryName },
  });

  const history = useHistory();
  const countries = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.Country) {
      if (countries) {
        const storedCountry = countries.find(item => item.name === data.Country[0].name);

        if (!storedCountry.loadedDetails) {
          dispatch({ type: 'ADD_COUNTRY_DETAILS', country: data.Country[0] });
        } else {
          setFormData({ ...storedCountry });
        }
      }

      setCountry(data.Country[0]);
    }
  }, [data, countries, country, dispatch]);

  if (loading) return <p className="countries-list-state">Loading...</p>;
  if (error) return <p className="countries-list-state">Error loading countries :(</p>;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: 'UPDATE_COUNTRY', country: { ...formData } });

    alert('Country updated');
    history.push(`/`);
  }

  return (
    <div id="country-details">
      {country && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <img src={country.flag.svgFile} alt={country.name} />
              <h2>{country.name}</h2>
            </legend>

            <div className="field">
              <label htmlFor="capital">Capital</label>
              <input
                type="text"
                name="capital"
                id="capital"
                value={formData.capital}
                onChange={handleInputChange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="area">Area (km²)</label>
                <input
                  type="number"
                  name="area"
                  id="area"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="population">Population</label>
                <input
                  type="number"
                  name="population"
                  id="population"
                  value={formData.population}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="topLevelDomains">Top Level Domains</label>
              <input
                type="text"
                name="topLevelDomains"
                id="topLevelDomains"
                value={formData.topLevelDomains}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>

          <button type="submit">
            Salvar
            </button>
        </form>
      )}
    </div>
  )
};

export default CountryDetails;