import React from "react";
import { fetchForecast, getForecastFor } from "../actions/forecastActions.js"

const Search = React.createClass({
  getInitialState: function() {
    return {
      error: undefined,
      inProgress: false
    }
  },

  toggleProgress: function() {
    this.setState({ inProgress: !this.state.inProgress });
  },

  handleSearch: function(e) {
    e.preventDefault();
    let result;
    let value = this.refs.city.value;
    value = value.indexOf(',') > 0 ? value.split(',').map(v => v.trim()) : value;

    if(this.state.error) this.setState({ error: undefined });
    if(!value) return this.setState({ error: 'Enter some value' });

    this.toggleProgress();

    fetchForecast(value).then(data => {
      result = data.payload;
      return this.props.dispatch(data);
    }).then(() => this.props.dispatch(getForecastFor(result[0] && result[0].city.id)))
      .then(() => this.toggleProgress())
      .catch(e => this.setState({ error: JSON.stringify(e), inProgress: false }))
  },

  render: function() {
    return (
      <form onSubmit={this.handleSearch} className="search-box">
        {this.state.error ? <p className="text-error">{this.state.error}</p> : null }
        <input type="text" ref="city" className="input-field" placeholder="Enter city names separated by commas"/>
        <input type="submit" value={this.state.inProgress ? "Getting Forecasts" : "Get Forecasts"} className="search-button"/>
      </form>
    )
  }
});

Search.propTypes = {
  dispatch: React.PropTypes.func
}

export default Search;
