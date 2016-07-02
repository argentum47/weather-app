'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//{"_id":707860,"name":"Hurzuf","country":"UA","coord":{"lon":34.283333,"lat":44.549999}}

const CitySchema = new Schema({
  cityId: { type: Number, required: true },
  name: { type: String, required: true },
  coord: { lon: String, lat: String }
});

CitySchema.index({ name: 1 });

module.exports = mongoose.model('City', CitySchema);
