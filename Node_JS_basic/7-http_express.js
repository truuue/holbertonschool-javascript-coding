const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const stringData = data.toString();
      const arrayData = stringData.split('\n').slice(1);
      const filteredArrayData = arrayData.filter((line) => line !== '');
      const namesByField = {};

      filteredArrayData.forEach((line) => {
        const parts = line.split(',');
        const firstName = parts[0];
        const field = parts[3];

        if (!namesByField[field]) {
          namesByField[field] = [];
        }
        namesByField[field].push(firstName);
      });

      const results = [`Number of students: ${filteredArrayData.length}`];
      const fields = Object.keys(namesByField);
      for (const field of fields) {
        const names = namesByField[field];
        const count = names.length;
        const list = names.join(', ');
        results.push(`Number of students in ${field}: ${count}. List: ${list}`);
      }
      return results;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const path = process.argv[2];
  countStudents(path)
    .then((data) => {
      res.send(`This is the list of our students\n${data.join('\n')}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});
app.listen(port);

module.exports = app;
