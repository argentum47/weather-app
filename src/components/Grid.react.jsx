import React from "react";
import SideBar from "./SideBar.react.jsx";
import List from "./List.react.jsx";

import { getForecastFor } from "../actions/forecastActions";

const Grid = React.createClass({
  handleClick: function(id) {
    this.context.dispatch(getForecastFor(+id));
  },

  render: function() {
    let { cities, currentCityId } = this.props;
    let currentCity = modifyData(cities, currentCityId, this.props.forecasts);

    return (
      <div className="grid">
        <SideBar cities={cities} currentCityId={currentCityId} onCitySelect={this.handleClick} className="pull-left sidebar"/>
        <List currentCity={currentCity} className="forecast-content"/>
      </div>
    )
  }
});

function modifyData(cities, cityId, forecasts) {
  let city = {};

  if(cities.length) {
    city = cities.find(c => c.id == cityId);
  }

  let forecast = forecasts[cityId] ? forecasts[cityId] : [];

  return { city, forecast } ;
}



Grid.propTypes = {
  cities: React.PropTypes.array,
  currentCityId: React.PropTypes.number
};

Grid.contextTypes = {
  dispatch: React.PropTypes.func
}

export default Grid;
