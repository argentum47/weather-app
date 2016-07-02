'use strict';

const request = require('request');

module.exports = function() {
  return new Promise((res, rej) => {
    let args = [].slice.call(arguments);

    request.apply(null, args.concat((err, response, body) => {
      if(err) rej(err);
      else if(response.statusCode > 399) rej("Server Error");
      else res(body)
    }))
  })
}
