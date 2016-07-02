import React from "react";

const City = React.createClass({
  render: function() {
    return (
      <li className={classnames({ selected: this.props.selected })} data-id={this.props.city.id}>{this.props.city.name}</li>
    );
  }
})


const SideBar = React.createClass({
  handleClick: function(e) {
    let target = e.target;

    if(target.dataset.id) this.props.onCitySelect(target.dataset.id);
  },

  render: function() {
    let citiesEl = this.props.cities.map(city => <City key={city.id} city={city} selected={this.props.currentCityId == city.id}/>)

    return (
      <ul className={this.props.className} onClick={this.handleClick}>{citiesEl}</ul>
    );
  }
})

export default SideBar;
