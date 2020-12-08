import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import CountriesMap from '../CountriesMap';

import formatValue from '../../utils/formatValue';

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
    location {
      latitude
      longitude
    }
    distanceToOtherCountries(first: 5) {
      distanceInKm
      countryName
    }
  }
}
`;

const NEAREST_COUNTRIES = gql`
  query Country($names: [String!]) {
	Country(filter:{
    name_in: $names
  }) {
    name
    location {
      latitude
      longitude
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
  const [nearestCountries, setNearestCountries] = useState([]);
  const [loadedNearestCountries, setLoadedNearestCountries] = useState(false);
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

  const [getNearestCountriesData, { data: nearestCountriesData }] = useLazyQuery(NEAREST_COUNTRIES);

  const history = useHistory();
  const countries = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.Country) {
      if (countries) {
        const storedCountry = countries.find(item => item.name === data.Country[0].name);

        if (!storedCountry) {
          history.push('/');
          return;
        }

        if (!nearestCountries.length) {
          const countriesDistances = data.Country[0].distanceToOtherCountries.map(anotherCountry => ({
            name: anotherCountry.countryName,
            distanceInKm: formatValue(anotherCountry.distanceInKm)
          }));

          setNearestCountries(countriesDistances);

          getNearestCountriesData({
            variables: {
              names: data.Country[0].distanceToOtherCountries.map(anotherCountry => anotherCountry.countryName)
            }
          });
        }

        if (!storedCountry.loadedDetails) {
          dispatch({ type: 'ADD_COUNTRY_DETAILS', country: data.Country[0] });
        } else {
          setFormData({ ...storedCountry });
        }
      }

      setCountry(data.Country[0]);
    }
  }, [data, countries, country, dispatch, history, getNearestCountriesData, nearestCountries.length]);

  useEffect(() => {
    if (nearestCountriesData && !loadedNearestCountries) {
      const updatedCountries = nearestCountries.map(anotherCountry => {
        const remoteCountry = nearestCountriesData.Country.find(remote => remote.name === anotherCountry.name);
        return {
          ...anotherCountry,
          latitude: remoteCountry.location.latitude,
          longitude: remoteCountry.location.longitude,
          flag: remoteCountry.flag.svgFile,
          emoji: remoteCountry.flag.emoji
        };
      });

      setNearestCountries(updatedCountries);
      setLoadedNearestCountries(true);
    }
  }, [nearestCountriesData, loadedNearestCountries, nearestCountries]);

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

            <CountriesMap
              mainCountry={{
                name: countryName,
                flag: country.flag.svgFile,
                emoji: country.flag.emoji,
                latitude: country.location.latitude,
                longitude: country.location.longitude
              }}
              nearestCountries={loadedNearestCountries ? nearestCountries : []}
            />
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