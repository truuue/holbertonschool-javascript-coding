#!/usr/bin/node
const request = require('request');
const moviesUrl = process.argv[2];
let count = 0;
request(moviesUrl, (err, response, body) => {
  if (err) {
    console.error(err);
  }
  for (const result of JSON.parse(body).results) {
    for (const character of result.characters) {
      if (character.includes('18')) {
        count += 1;
      }
    }
  }
  console.log(count);
});
