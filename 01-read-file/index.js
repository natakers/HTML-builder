
const fs = require('fs');
const path = require('path');
const pathWay = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(pathWay);
let data = '';
stream.on('data', partData => data += partData);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));