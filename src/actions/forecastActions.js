import { GET_FORECAST, GET_FORECASTS, UPDATE_FORECASTS } from "../constants/forecast";

export function fetchForecastLocation(crd) {
  return fetch(`/weather?${makeUrl({ lng: crd.longitude, lat: crd.latitude })}`)
    .then(res => res.json())
    .then(res => ({ type: UPDATE_FORECASTS, payload: res.data }));
}

export function fetchForecast(cities) {
  return fetch(`/weather?${makeUrl({ cities })}`)
    .then(res => res.json())
    .then(res => ({ type: GET_FORECASTS, payload: res.data }))
}

export function getForecastFor(id) {
  return { type: GET_FORECAST, payload: id }
}
