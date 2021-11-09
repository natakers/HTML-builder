const fs = require('fs');
const path = require('path');
const process = require('process');
const pathWay = path.join(__dirname, 'testFile.txt')

fs.open(pathWay, 'w', (err) => {
    if(err) throw err;
});

const readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("Write something ")
rl.on("line", function (line) {
  if (line == 'exit') {
   rl.close()
  }
  else {
  fs.appendFile(pathWay, line, function(error){
    if(error) throw error;
  });
  }

 })
process.on('exit', function () {
  console.log("Thanks and bye");
 });
