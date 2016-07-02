import React from "react";

const Forecast = React.createClass({
  render: function() {
    let f = this.props.forecast;

    return (
      <li>
        <span>Temparature: {f.main.temp} Celcius</span>
        <span>Humdity: {f.main.humidity}</span>
        <span>{f.weather[0].description}</span>
        <i>As on: {f.dt_txt}</i>
      </li>
    )
  }
});


const List = React.createClass({
  render: function() {
    let forecasts = this.props.currentCity.forecast.map((f, i) => <Forecast key={i} forecast={f}/>)
    return <ul className={this.props.className}>{forecasts}</ul>
  }
});

export default List;
