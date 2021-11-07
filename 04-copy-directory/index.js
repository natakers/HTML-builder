const fs = require('fs');
const path = require('path');
const pathWay = path.resolve('../HTML-builder/04-copy-directory', 'files-copy')
const pathCopy = path.resolve('../HTML-builder/04-copy-directory', 'files')

fs.mkdir(pathWay, {recursive: true}, err => {
   if(err)  {
       console.log('Something does wrong')
   }
   fs.readdir(pathCopy, {withFileTypes: true}, function(err, items) {  
    for (let i=0; i<items.length; i++) {
        if (items[i].isFile()) {
            fs.copyFile(pathCopy + '\\' + items[i].name, pathWay + '\\' + items[i].name, err => {
                if(err) throw err; 
             });
        }
    }
    console.log('Copying is completed');
});
});

