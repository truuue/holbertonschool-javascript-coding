#!/usr/bin/node
const request = require('request');
let count = 0;
request(process.argv[2], (err, response, body) => {
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
