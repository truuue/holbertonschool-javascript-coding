#!/usr/bin/node
const url = ('https://swapi-api.hbtn.io/api/films/:id' + process.argv[2]);
const request = require('request');

request(url, (err, response, body) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.parse(body).title);
  }
});
