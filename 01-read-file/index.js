
const fs = require('fs');
const stream = fs.createReadStream('text.txt');
let data = '';
stream.on('data', partData => data += partData);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));