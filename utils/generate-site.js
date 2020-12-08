const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

//writing files
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                //return out of the function here to make sure the Promise doesn't accidentally excute the resolve() function as well
                return;
            }

            // if everthing went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok:true,
                message: 'File Created!'
            });
        });
    });
};

//copying files
const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message: 'Successful stylesheet created!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };