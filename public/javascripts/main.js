'use strict';

function $(sel) {
  return document.querySelector(sel)
}

function $$(sel) {
  return document.querySelectorAll(sel)
}

$.frag = function() {
  return document.createDocumentFragment()
}

$.templ = function(sel) {
  let template = $(sel)
  return document.importNode(template.content, true)
}

function makeUrl(obj) {
  return Object.keys(obj).map((k) => {
    if(Array.isArray(obj[k])) {
      // key: [val1, val2] -> key=val1&key=val2
      return obj[k].map(v => `${k}=${v}`).join('&')
    }
    return `${k}=${obj[k]}` // key: value -> key=value
  }).join('&')
}


function classnames(name) {
  if(name.substr) return name;
  if(Array.isArray(name)) return name.join(' ');
  if(typeof name == "object") return Object.keys(name).filter(k => name[k]).join(' ')

  return "";
}

function getCurrentLocation() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej, options);
  });
}
