const fs = require('fs');
const path = require('path');
const pathWay = path.resolve('../HTML-builder/04-copy-directory', 'files-copy')
const pathCopy = path.resolve('../HTML-builder/04-copy-directory', 'files')

// if (pathWay) {
    fs.readdir(pathWay, {withFileTypes: true}, function(err, items1) {   
        var file1
        if (items1) {
            // console.log('not empty')
            for (let i=0; i<items1.length; i++) {
                if (items1[i].isFile()) {
                    file1 = path.join(`${pathWay}`, `${items1[i].name}`) ;
                    fs.unlink(file1, function(err){
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log("Файл удалён");
                        }
                    });
                }
            }

        }
        
})




fs.mkdir(pathWay, {recursive: true}, err => {
    if(err)  {
     //    console.log('Something does wrong')
    }
});
   fs.readdir(pathCopy, {withFileTypes: true}, function(err, items) {  
    
    for (let i=0; i<items.length; i++) {
        if (items[i].isFile()) {
            let path1 = path.join(`${pathCopy}`, `${items[i].name}`)
            let path2 = path.join(`${pathWay}`, `${items[i].name}`)
            fs.copyFile(path1, path2, err => {
                if(err) throw err; 
             });
        }
    }
    console.log('Copying is completed');
});
// });

