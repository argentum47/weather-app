import React from "react";
import ReactDOM from "react-dom";
import store from "./store.js";
import Index from "./components/Index.react.jsx";

const render = () => {
  let state = store.getState();
  console.log(state)

  ReactDOM.render(<Index
                    cities={state.cities}
                    forecasts={state.forecasts}
                    currentCityId={state.currentCityId}
                    dispatch={store.dispatch}
                  />, $(".container"));
}

store.subscribe(render);
render();
