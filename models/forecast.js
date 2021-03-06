'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForecastSchema = new Schema({
  cityId: { type: Schema.Types.ObjectId, ref: 'City' },
  forecast: { type: Object }
});

ForecastSchema.index({ cityId: 1 })

module.exports = mongoose.model('Forecast', ForecastSchema)
