import React from "react";
import Search from "./Search.react.jsx";
import Grid from "./Grid.react.jsx"

import { fetchForecastLocation } from "../actions/forecastActions";

const Index = React.createClass({
  childContextTypes: {
    dispatch: React.PropTypes.func.isRequired
  },

  getChildContext: function() {
    return {
      dispatch: this.props.dispatch
    }
  },

  getCurrentLocation: function() {
    getCurrentLocation().then(pos => {
      fetchForecastLocation(pos.coords).then(data => {
        this.props.dispatch(data);
      })
    })
  },

  render: function()  {
    return (
      <div className="wrapper">
        <a className="pull-right" onClick={this.getCurrentLocation}>Get Forecast in this location</a>
        <div className="clearfix">
          <Search dispatch={this.props.dispatch}/>
        </div>
        <main>
          <Grid {...this.props}/>
        </main>
      </div>
    );
  }
})

export default Index;
