const fs = require('fs');
const path = require('path');
let pathWay = path.resolve('../HTML-builder/06-build-page', 'project-dist')
const pathWayAssets = path.resolve('../HTML-builder/06-build-page/project-dist', 'assets')
const pathCopy = path.resolve('../HTML-builder/06-build-page', 'assets')
const pathWayStyles = path.resolve('../HTML-builder/06-build-page/project-dist', 'style.css')
const pathWayIndex = path.resolve('../HTML-builder/06-build-page/project-dist', 'index.html')
const pathCopyStyles = path.resolve('../HTML-builder/06-build-page', 'styles')
const pathTemp = path.resolve('../HTML-builder/06-build-page', 'template.html')
const pathComp = path.resolve('../HTML-builder/06-build-page', 'components')
let arr1 = []


addDirectory(pathWay)
function addDirectory(pathWay) {
    fs.mkdir(pathWay, {recursive: true}, err => {
        if(err)  {
            // console.log('Something does wrong')
        }
    })
}
addDirectory(pathWayAssets)

    // надо скопировать директории и файлы
function addData(pathCopy, pathWayAssets) {
    fs.readdir(pathCopy, {withFileTypes: true}, function(err, items) {  
        for (let i=0; i<items.length; i++) {
            if (items[i].isDirectory()) {
                addDirectory(pathWayAssets + '\\' + items[i].name)
                addData(pathCopy + '\\' + items[i].name, pathWayAssets + '\\' + items[i].name)
            }
            if (items[i].isFile()) {
                fs.copyFile(pathCopy + '\\' + items[i].name, pathWayAssets + '\\' + items[i].name, err => {
                    if(err) throw err; 
                 });
            }
        }
        
    });
    // console.log('Copying is completed');
}
    
addData(pathCopy, pathWayAssets)

// сорка стилей
fs.open(pathWayStyles, 'w', (err) => {
    if(err) throw err;
});

fs.open(pathWayIndex, 'w', (err) => {
    if(err) throw err;
});

fs.readdir(pathCopyStyles, {withFileTypes: true}, function(err, items) {  
    const output = fs.createWriteStream(pathWayStyles);
    let input
    for (let i=0; i<items.length; i++) {
        file = pathCopyStyles + '\\' + items[i].name
        if (items[i].isFile() && path.parse(file).ext == '.css') {
            input = fs.createReadStream(file);
            input.pipe(output);
        }
    }
    // console.log('Copying styles  is completed');
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
                // console.log(aa)
                arr1.push(aa[0].match(/\w+/g))
            }
            
        }
        //  console.log(arr1)
        let template 
const stream = fs.createReadStream(pathTemp);
let data1 = '';
stream.on('data', partData => data1 += partData);
stream.on('end', () => template = data1);
stream.on('error', error => console.log('Error', error.message));
// console.log('components = ' + arr1)
let components = arr1
// console.log('components = ' + components)
components.forEach(component => {
    // console.log('component = ' + component[0])
    // console.log(`${pathComp}/${component[0]}`)
     fs.readFile(`${pathComp}/${component[0]}.html`, "utf8", async (err, content) => {
        if (err) {
            throw err
        }
        let name = path.parse(component[0]).name
        // console.log(name)
        // console.log(content)
        // console.log(template)
// console.log(arr1[0][0])
        template = await template.replace(new RegExp(`{{${name}}}`), content)
        fs.writeFile(`${pathWay}/index.html`, template, (err) => {
            if (err) throw err
        })
    })
})
    });
    //  console.log(arr1)
}
arrayAdd()


fs.readFile(pathWayIndex, {withFileTypes: true}, function(err, data) {  
    const output2 = fs.createWriteStream(pathWayIndex);
    let input2
            input2 = fs.createReadStream(pathTemp);
            input2.pipe(output2);
    // console.log('Copying is completed');
});


// console.log(pathComp)
// console.log('index = ' + pathWayIndex)
    fs.readdir(pathComp, {withFileTypes: true}, function(err, items) {  
        let input1
        
        for (let i=0; i<items.length; i++) {
            file = pathComp + '\\' + items[i].name
            // console.log('file = ' + file);
            if (items[i].isFile() && path.parse(file).ext == '.html') {
                input1 = fs.createReadStream(file);
            }
        }
        // console.log('Copying is completed');
    });


