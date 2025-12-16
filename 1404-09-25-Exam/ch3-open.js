import * as fs from 'fs';

const inputs = process.argv.slice(2)


const fileOrFolder = inputs[0]

if (fileOrFolder.split('.').length >= 2) {
    fs.readFile(`./${fileOrFolder}`, "utf8", function (error, data) {
        if (error) {
            console.log('error in read file.')
        }
        else {
            console.log('\nfile read:')
            console.log(data)
        }
    })
}
else {
    fs.readdir(fileOrFolder, (error, files) => {        
        if (error) {
            console.log('error in read directory.')
        }
        else {
            console.log("\nfiles in directory:")

            for (const file of files) {
                console.log(file)
            }
        }
    })
}