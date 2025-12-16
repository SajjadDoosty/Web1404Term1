import { run, use } from "./ch5-framework.js"
import * as fs from 'fs';
const DATABASE_PATH = './database.json'


use("createFile", (inputs) => {
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
})

use("open", (inputs) => {
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
})

use("createRecord", (inputs) => {
    const name = inputs[0]
    const lastname = inputs[1]
    const email = inputs[2]

    const user = {
        name: name,
        lastname: lastname,
        email: email,
    }

    fs.readFile(`${DATABASE_PATH}`, "utf8", function (error, data) {
        if (error) {
            console.log('error in read database.')
        }
        else {
            const users = JSON.parse(data)
            users.records.push(user)

            fs.writeFile(`${DATABASE_PATH}`, JSON.stringify(users), function (error) {
                if (error) {
                    console.log('error in save database.')
                }
                else {
                    console.log('database saved.')
                }
            })
        }
    })
})


run();