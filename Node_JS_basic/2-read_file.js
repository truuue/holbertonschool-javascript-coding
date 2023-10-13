const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8').split('\n');
    while (data[data.length - 1] === '') {
      data.pop();
    }
    const students = data.map((line) => line.split(','));
    const fields = {};
    students.forEach((student) => {
      const [firstname, , , field] = student;
      if (!fields[field]) {
        fields[field] = {
          count: 0,
          list: [],
        };
      }
      fields[field].count += 1;
      fields[field].list.push(firstname);
    });

    console.log(`Number of students: ${students.length}`);

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
