const fs = require('fs');
const path = require('path');
const filename = '/text.txt';
const getPath = () => path.join(__dirname, '..', '02-write-file', filename);

const writableStream = fs.createWriteStream(getPath());

console.log('Enter your text:');

process.stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    console.log('\nInput completed!');
    process.exit();
  }

  writableStream.write(input + '\n');
});

process.on('SIGINT', () => {
  console.log('\nInput completed!');
  process.exit();
});
