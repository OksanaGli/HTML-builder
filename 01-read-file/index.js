const fs = require('fs');
const path = require('path');
const filename = '/text.txt';
const getPath = () => path.join(__dirname, '..', '01-read-file', filename);
const reader = fs.createReadStream(getPath(), 'utf8');

reader.on('data', function (chunk) {
  console.log(chunk.toString());
});
