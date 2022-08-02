import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: response.data,
    });
  };
}

export function getActivities() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/activity");
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: response.data,
    });
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postActivities(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/activity", {
      name: payload.name,
      duration: payload.duration,
      difficulty: payload.difficulty,
      season: payload.season,
      countries: payload.id,
    });
    return response;
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function detailVacio() {
  return async function (dispatch) {
    return dispatch({
      type: "DETAIL_VACIO",
    });
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload: payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}
export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload: payload,
  };
}
export function filterByActivity(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload: payload,
  };
}
