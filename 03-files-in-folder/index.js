const fs = require('fs');
const path = require('path');
const pathWay = path.resolve('../HTML-builder/03-files-in-folder/secret-folder')


fs.readdir(pathWay, {withFileTypes: true}, function(err, items) {   
    var file
    for (let i=0; i<items.length; i++) {
        if (items[i].isFile()) {
            file = path.join(`${pathWay}`, `${items[i].name}`)
            fs.stat(file, generate_callback(file));
        }
    }
    
});

function generate_callback(file) {
    return function(err, stats) {
            console.log(path.parse(file).name + ' - ' + path.parse(file).ext + " - " + stats.size + 'b')
        }
};

