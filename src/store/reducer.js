const INITIAL_STATE = {
  data: []
};

function countries(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_COUNTRY': {
      const country = action.country;

      return {
        ...state,
        data: [
          ...state.data,
          {
            name: country.name,
            flag: country.flag.svgFile,
            capital: `${country.capital || '-'}`,
          }
        ]
      };
    }

    case 'ADD_COUNTRY_DETAILS': {
      return {
        ...state,
        data: state.data.map((country, index) => {
          if (country.name !== action.country.name || country.loadedDetails) {
            return country;
          }

          return {
            ...country,
            area: action.country.area,
            population: action.country.population,
            topLevelDomains: action.country.topLevelDomains[0].name,
            loadedDetails: true
          };
        })
      };
    }

    case 'UPDATE_COUNTRY': {
      return {
        ...state,
        data: state.data.map((country, index) => {
          if (country.name !== action.country.name) {
            return country;
          }

          return {
            ...country,
            ...action.country
          };
        })
      };
    }

    default:
      return state;
  }
}

export default countries;