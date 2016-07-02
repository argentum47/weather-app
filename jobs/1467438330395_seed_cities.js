'use strict';

const fs = require('fs');
const JSONStream = require('JSONStream');
const mongoose = require('mongoose');

const mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient

MongoClient.connect(require('../config/config').dbUrl, function(err, db) {
  console.log("Connected correctly to server");
  db.createCollection('cities', function(err, coll) {
    if(!err) {
      let cityInsert = db.collection('cities').initializeOrderedBulkOp();
      runSeed(cityInsert, (result) => { console.log(result); db.close(); });
    }
  })

});


function runSeed(cI, cb) {
  let stream  = fs.createReadStream('./city.list.json').pipe(JSONStream.parse());

  stream.on('data', function(d) {
    cI.insert({ cityId: d._id, name: d.name.toLowerCase(), coord: d.coord })
  });

  stream.on('end', function() {
    cI.execute((err, result) => {
      if(!err) {
        cb(result);
      }
    });
  })
}
