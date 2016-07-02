import { createStore, combineReducers } from "redux";
import { cities } from "./store/cities";
import { forecasts } from "./store/forecasts";
import { currentCityId } from "./store/currentCity"

const forecastApp = combineReducers({
  cities,
  forecasts,
  currentCityId
});

const store = createStore(forecastApp, {});

export default store;
