import { UPDATE_FORECASTS, GET_FORECAST, GET_FORECASTS } from "../constants/forecast";

export function cities(state = [], action) {
  if(action.type == GET_FORECASTS) {
    return action.payload.map(data => ({ id: data.city.id, name: data.city.name }))
  }

  if(action.type == UPDATE_FORECASTS) {
    let data = action.payload
    return [({ id: data.city.id, name: data.city.name }), ...state]
  }

  return [...state];
}
