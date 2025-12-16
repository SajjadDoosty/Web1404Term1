import * as fs from 'fs';

const inputs = process.argv.slice(2);


const name = inputs[0]
const body = inputs[1]

fs.writeFile(`./${name}`, body, function (error) {
    if (error) {
        console.log('error in create file.')
    }
    else {
        console.log('file created.')
    }
})