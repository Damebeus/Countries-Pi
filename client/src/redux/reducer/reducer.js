const initialState = {
  countries: [],
  countriesDos: [],
  activities: [],
  detail: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        countriesDos: action.payload,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "POST_ACTIVITIES":
      return {
        ...state,
      };
    case "GET_NAME_COUNTRIES":
      return {
        ...state,
        countriesDos: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "DETAIL_VACIO":
      return {
        ...state,
        detail: [],
      };

    case "ORDER_BY_POPULATION":
      const orderByPopulation =
        action.payload === "Asc"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population < a.population) {
                return 1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        countriesDos: orderByPopulation,
      };
    case "ORDER_BY_NAME":
      const orderByName =
        action.payload === "az"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countriesDos: orderByName,
      };
    case "FILTER_BY_ACTIVITY":
      let filtradoAct = [];
      state.countries.forEach((country) => {
        country.activities.forEach((activity) => {
          if (activity.name === action.payload) {
            filtradoAct.push(country);
          }
        });
      });
      /* const filterByActivity = state.countries.filter(
        (country) => country.activities === action.payload
      ); */
      return {
        ...state,
        countriesDos: filtradoAct,
      };

    case "FILTER_BY_CONTINENT":
      const filterByContinent = state.countries.filter(
        (country) => country.continent === action.payload
      );
      return {
        ...state,
        countriesDos: filterByContinent,
      };

    default:
      return state;
  }
}

export default rootReducer;
