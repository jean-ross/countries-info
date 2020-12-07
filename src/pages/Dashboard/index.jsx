import React from 'react';

import CountriesList from '../../components/CountriesList';

import './styles.css';

const Dashboard = () => {
  return (
    <div id="page-dashboard">
      <header>
        <h1>Countries of the World</h1>
      </header>

      <main>
        <CountriesList />
      </main>
    </div >
  )
};

export default Dashboard;