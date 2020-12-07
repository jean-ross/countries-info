import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import './styles.css';

const COUNTRIES = gql`
  query GetCountries {
    Country {
      name
      capital
      flag {
        emoji
        svgFile
      }
    }
  }
`;

const CountriesList = () => {
  const [search, setSearch] = useState('');
  const { loading, error, data } = useQuery(COUNTRIES);

  const history = useHistory();
  const countries = useSelector(state => state.data);
  const dispatch = useDispatch();

  if (loading) return <p className="countries-list-state">Loading...</p>;
  if (error) return <p className="countries-list-state">Error loading countries :(</p>;

  data.Country.forEach(country => {
    const countryIndex = countries.findIndex(item => item.name === country.name);

    if (countryIndex < 0) {
      dispatch({ type: 'ADD_COUNTRY', country });
    }
  });

  function navigateToCountryDetails(countryName, country) {
    history.push(`/country/${countryName}`);
  }

  function handleSearch(event) {
    const { value } = event.target;

    setSearch(value);
  }

  return (
    <>
      <form id="search-country" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="country"
          id="name"
          autoComplete="off"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <ul id="countries-grid">
        {countries
          .filter(country => search === '' || country.name.toLowerCase().includes(search.toLowerCase()))
          .map(country => (
            <li
              key={country.name}
              className="country-card"
              onClick={() => navigateToCountryDetails(country.name, country)}
            >
              <img src={country.flag} alt={country.name} />
              <div className="country-info">
                <h2>{country.name}</h2>
                <span><b>Capital: </b>{country.capital}</span>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
};

export default CountriesList;