const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const response = [];
    const students = data.split('\n');
    let count = 0;
    for (let i = 1; i < students.length; i += 1) {
      if (students[i]) {
        count += 1;
        const student = students[i].split(',');
        if (!response[student[3]]) response[student[3]] = [];
        response[student[3]].push(student[0]);
      }
    }
    const result = [`Number of students: ${count}`];
    for (const key in response) {
      if (key) {
        const list = response[key];
        result.push(`Number of students in ${key}: ${list.length}. List: ${list.join(', ')}`);
      }
    }
    return result.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const result = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${result}`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
