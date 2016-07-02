import { GET_FORECAST } from "../constants/forecast";
import { combineReducers } from "redux";

export function currentCityId(state = 0, action) {
  if(action.type == GET_FORECAST) {
    return action.payload;
  }

  return state;
}
