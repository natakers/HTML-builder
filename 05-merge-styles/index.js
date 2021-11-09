const fs = require('fs');
const path = require('path');
const pathWay = path.resolve(__dirname, 'project-dist', 'bundle.css')
const pathCopy = path.resolve(__dirname, 'styles')
fs.open(pathWay, 'w', (err) => {
    if(err) throw err;
});

fs.readdir(pathCopy, {withFileTypes: true}, function(err, items) {  
    const output = fs.createWriteStream(pathWay);
    let input
    for (let i=0; i<items.length; i++) {
        file = path.join(`${pathCopy}`, `${items[i].name}`)
        if (items[i].isFile() && path.parse(file).ext == '.css') {
            input = fs.createReadStream(file);
            input.pipe(output);
        }
    }
    console.log('Copying is completed');
});
