const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const database = process.argv[2];
    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        const students = data.split('\n').filter((line) => line !== '');
        const fields = {};

        students.forEach((student) => {
          const [firstname, , , field] = student.split(',');
          if (!fields[field]) {
            fields[field] = {
              count: 0,
              list: [],
            };
          }
          fields[field].count += 1;
          fields[field].list.push(firstname);
        });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is the list of our students\n');
        res.write(`Number of students: ${students.length}\n`);

        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            res.write(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}\n`);
          }
        }

        res.end();
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;
