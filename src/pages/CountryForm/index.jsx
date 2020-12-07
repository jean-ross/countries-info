import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import CountryDetails from '../../components/CountryDetails';

import './styles.css';

const CountryForm = () => {
  return (
    <div id="page-country-form">
      <header>
        <h1>Countries of the World</h1>
      </header>

      <main>
        <Link to="/">
          <FiArrowLeft />
          Back to list
        </Link>

        <CountryDetails />
      </main>
    </div >
  )
};

export default CountryForm;