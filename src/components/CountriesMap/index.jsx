import React from 'react';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { mapIcon, mapSecondaryIcon } from '../../utils/mapIcon';

import './styles.css';

const CountriesMap = (props) => {
  return (
    <>
      <Map
        center={[props.mainCountry.latitude, props.mainCountry.longitude]}
        style={{ width: '100%', height: 280 }}
        zoom={3}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {props.mainCountry.name && (
          <Marker
            icon={mapIcon}
            position={[props.mainCountry.latitude, props.mainCountry.longitude]}
          >
            <Popup closeButton={false} className="map-popup">
              {props.mainCountry.emoji} {props.mainCountry.name}
            </Popup>
          </Marker>
        )}

        {props.nearestCountries.map(country => (
          <Marker
            key={country.name}
            icon={mapSecondaryIcon}
            position={[country.latitude, country.longitude]}
          >
            <Popup closeButton={false} className="map-popup">
              {country.emoji} {country.name}
              <br />
              {`(${country.distanceInKm} km away)`}
            </Popup>
          </Marker>
        ))}

      </Map>
    </>
  )
};

CountriesMap.defaultProps = {
  mainCountry: {},
  nearestCountries: []
};

export default CountriesMap;