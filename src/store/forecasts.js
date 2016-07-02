import { GET_FORECASTS, UPDATE_FORECASTS } from "../constants/forecast";

export function forecasts(state = {}, action) {
  if(action.type == GET_FORECASTS) {
    return action.payload.reduce((acc, data) => {
      acc[data.city.id] = data.list;
      return acc;
    }, {})
  }

  if(action.type == UPDATE_FORECASTS) {
    return { [action.payload.city.id]: action.payload.list, ...state }
  }

  return {...state}
}
