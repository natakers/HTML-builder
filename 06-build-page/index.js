const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises')
let pathWay = path.resolve(__dirname, 'project-dist')
const pathWayAssets = path.resolve(__dirname, 'project-dist', 'assets')
const pathCopy = path.resolve(__dirname, 'assets')
const pathWayStyles = path.resolve(__dirname, 'project-dist', 'style.css')
const pathWayIndex = path.resolve(__dirname, 'project-dist', 'index.html')
const pathCopyStyles = path.resolve(__dirname, 'styles')
const pathTemp = path.resolve(__dirname, 'template.html')
const pathComp = path.resolve(__dirname, 'components')
let arr1 = []


addDirectory(pathWay)
addDirectory(pathWayAssets)
//  function addDirectory(pathWay) {
    // fs.mkdir( pathWay, {recursive: true}, err => {
    //     if(err)  {
    //     }
    //      console.log('dir done ' + pathWay)
    // })
// }

 function addDirectory(pathWay) {
    // fsPromises
     fs.mkdir( pathWay, {recursive: true}, err => {
        if(err)  {
        }
         console.log('dir done1 ' + pathWay)
    })
}

// (async () => {
//     if(!fs.existsSync(outputPath)){
//       debug("Folder not exsists! path: "+outputPath)
//       await Promise.all(mkdir(outputPath))
//     }
//     res.send('<h1>Hello world!</h1>')
//   })()

// fs.mkdir(pathWayAssets, {recursive: true}, err => {
//     if(err)  {
//     }
//      console.log('dir done ' + pathWayAssets)
// })
// }/


    // надо скопировать директории и файлы
// ( () => {
    
 async function addData(pathCopy, pathWayAssets) {
   await fs.promises
        .readdir( pathCopy, {withFileTypes: true}) 
        .then(async items =>  {
            console.log(' прочитали дир')
            // for (let i=0; i<items.length; i++) {
                for (let item of items) {
                let path1 =  path.join(`${pathWayAssets}`, `${item.name}`)
                let path2 = path.join(`${pathCopy}`, `${item.name}`) 
                if (item.isDirectory()) {
                    console.log('хочу создать дир')
                    // addDirectory(path1)
                    await fs.promises.mkdir(path1, {recursive: true})
                    
                    //  addDirectory(path1)
                    
                    addData(path2, path1)
                }
                if (item.isFile()) {
                    fs.copyFile( path2, path1, err => {
                        if(err) throw err; 
                     });
                     console.log('file done ' + item.name)
                }
            }

        })       
        // });
    }
// })()
 



    
addData(pathCopy, pathWayAssets)

// сборка стилей
fs.open(pathWayStyles, 'w', (err) => {
    if(err) throw err;
    console.log('file done' + pathWayStyles)
});

fs.open(pathWayIndex, 'w', (err) => {
    if(err) throw err;
    console.log('file done' + pathWayIndex)
});

fs.readdir(pathCopyStyles, {withFileTypes: true}, function(err, items) {  
    const output = fs.createWriteStream(pathWayStyles);
    let input
    for (let i=0; i<items.length; i++) {
        file = path.join(`${pathCopyStyles}`, `${items[i].name}`)
        if (items[i].isFile() && path.parse(file).ext == '.css') {
            input = fs.createReadStream(file);
            input.pipe(output);
        }
    }
});


// template


let aa
function arrayAdd() {
    fs.readFile(pathTemp, function(err, data) {
        if(err) throw err;
        array = data.toString().split("\n");
        for(i in array) {
            if (array[i].match(/{{\w+}}/g)) {
                aa = array[i].match(/{{\w+}}/g)
                arr1.push(aa[0].match(/\w+/g))
            }
            
        }
        let template 
const stream = fs.createReadStream(pathTemp);
let data1 = '';
stream.on('data', partData => data1 += partData);
stream.on('end', () => template = data1);
stream.on('error', error => console.log('Error', error.message));
let components = arr1
components.forEach(component => {
    let file1 = path.join(`${pathComp}`, `${component[0]}`)
     fs.readFile(`${file1}.html`, "utf8", async (err, content) => {
        if (err) {
            throw err
        }
        let name = path.parse(component[0]).name
        template = await template.replace(new RegExp(`{{${name}}}`), content)
        let file2 = path.join(`${pathWay}`, 'index.html')
        fs.writeFile(file2, template, (err) => {
            if (err) throw err
        })
    })
})
    });
}
arrayAdd()


fs.readFile(pathWayIndex, {withFileTypes: true}, function(err, data) {  
    const output2 = fs.createWriteStream(pathWayIndex);
    let input2
            input2 = fs.createReadStream(pathTemp);
            input2.pipe(output2);
});

    fs.readdir(pathComp, {withFileTypes: true}, function(err, items) {  
        let input1
        
        for (let i=0; i<items.length; i++) {

            file = path.join(`${pathComp}`, `${items[i].name}`)
            if (items[i].isFile() && path.parse(file).ext == '.html') {
                input1 = fs.createReadStream(file);
            }
        }
    });


