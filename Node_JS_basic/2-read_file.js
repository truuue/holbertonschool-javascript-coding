const fs = require('fs');

function countStudents(path) {
  let data = '';
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const stringData = data.toString();
  const arrayData = stringData.split('\n').slice(1);
  const filteredArrayData = arrayData.filter((line) => line !== '');
  console.log(`Number of students: ${filteredArrayData.length}`);
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

  const fields = Object.keys(namesByField);
  for (const field of fields) {
    const names = namesByField[field];
    const count = names.length;
    const list = names.join(', ');
    console.log(`Number of students in ${field}: ${count}. List: ${list}`);
  }
}

module.exports = countStudents;
