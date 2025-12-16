import * as fs from 'fs';
const DATABASE_PATH = './database.json'

const inputs = process.argv.slice(2)


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