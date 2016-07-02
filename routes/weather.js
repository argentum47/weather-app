'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var City = mongoose.model('City');
var Forecast = mongoose.model('Forecast');

var requestP = require('../request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  var cities = req.query.cities;
  let promise = Promise.resolve(true);

  if(cities) {
    promise = City.find({ name : { $in: cities }}).then(cities => {
      return Promise.all(cities.map(city => findForecastById(city)))
    })
  } else if(req.query.lat && req.query.lng) {
    promise = City.findOne({ 'coord.lat': req.query.lat, 'coord.lon': req.query.lon })
      .then((data) => findForecastByCord(data, req.query))
  }

  promise.then(datas => res.json({ data: datas })).catch(e =>next(e));
});

function findForecastByCord(data, crd) {
  if(data) {
    return Forecast.findOne({ cityId: city._id })
  }

  else return requestP(makeUrl({ coords: {lng: crd.lng, lat: crd.lat }})).then(data => {
    let fdata = JSON.parse(data);
    return City.create({ cityId: fdata.city.id, name: fdata.city.name, coord: fdata.city.coord })
      .then(city =>  Forecast.create({ cityId: city._id, name: fdata.city.name, forecast: fdata }))
      .then(() => fdata)
  })
}

function findForecastById(city) {
  return Forecast.findOne({ cityId: city._id }).then(f => {
    console.log(f);

    if(!f) {
      console.log("requesting");

      return requestP(makeUrl({ids: city.cityId})).then(data => {
        let fdata = JSON.parse(data);
        return Forecast.create({ cityId: city._id, name: fdata.city.name, forecast: fdata }).then(() => fdata)
      })
    }

    return f.forecast
  })
}


function makeUrl(option, days) {
  days = days || 14;
  var apiKey = require('../config/config').apiKey;
  var baseUrl = "http://api.openweathermap.org/data/2.5/forecast";
  var rest = `mode=json&units=metric&cnt=${days}&appid=${apiKey}`


  if(option.coords) {
    let coords = option.coords;
    return `${baseUrl}?lon=${coords.lng}&lat=${coords.lat}&${rest}`
  }

  if(option.ids) {
    let ids = option.ids;
    if(Array.isArray(ids)) {
      return `${baseUrl}?id=${ids.join(',')}&${rest}`
    } else if (ids.toFixed) {
      return `${baseUrl}?id=${ids}&${rest}`
    }
  }

  throw new Error("INVALID_INPUT")
}


module.exports = router;
