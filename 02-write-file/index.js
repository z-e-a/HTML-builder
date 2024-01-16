const readline = require('readline');
const fs = require('fs');
const path = require('path');
const process = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
  } else {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      line + '\n',
      function (error) {
        if (error) throw error;
      },
    );
  }
});

process.on('beforeExit', () => {
  console.log('Work is done! Goodbye...');
});

console.log('Enter text:');
