const fs = require('fs');
const path = require('path');
const process = require('process');
const pathWay = path.resolve('../HTML-builder/04-copy-directory', 'files-copy')
const pathCopy = path.resolve('../HTML-builder/04-copy-directory', 'files')

// fs.open(pathWay, 'w', (err) => {
//     if(err) throw err;
// });
// console.log('ffff')
// fs.mkdir(pathWay+'\\files-copy');
// let fs = require('fs');
fs.mkdir(pathWay, {recursive: true}, err => {
   if(err) /*throw err*/ {
       console.log('Something does wrong')
   }
//    console.log('Directory init');
   fs.readdir(pathCopy, {withFileTypes: true}, function(err, items) {   
    var file
    // console.log(items)
    for (let i=0; i<items.length; i++) {
        if (items[i].isFile()) {
            // console.log(items)
            // console.log(file = pathWay + '\\' + items[i].name);
            fs.copyFile(pathCopy + '\\' + items[i].name, pathWay + '\\' + items[i].name, err => {
                if(err) throw err; // не удалось скопировать файл
                // console.log('Файл успешно скопирован');
             });
        }
    }
    console.log('Copying is completed');
});
});

