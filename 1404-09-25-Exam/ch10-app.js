import {use, write, start} from './ch10-http.js'
import * as fs from 'fs'
const DATABASE_PATH = './database-http.json'


use("create", function (request, response) {
    try {
        const userJson = request.body

        const user = {
            name: userJson.name,
            lastname: userJson.lastname,
            age: userJson.age,
        }

        fs.readFile(`${DATABASE_PATH}`, "utf8", function (error, data) {
            if (error) {
                write(response, 500, 'error in save database.')
            }
            else {
                const users = JSON.parse(data)
                users.records.push(user)

                fs.writeFile(`${DATABASE_PATH}`, JSON.stringify(users), function (error) {
                    if (error) {
                        write(response, 500, 'error in save database.')
                    }
                    else {
                        write(response, 200, 'user created.')
                    }
                })
            }
        })
    } catch (error) {
        write(response, 500, 'error while procceing.')
    }
})

use("delete", function (request, response) {
    const nameForDelete = request.url.split('/data/')[1]
    let deletedCount = 0

    fs.readFile(`${DATABASE_PATH}`, "utf8", function (error, usersData) {
        if (error) {
            write(response, 500, 'error in save database.')
        }
        else {
            const users = JSON.parse(usersData)

            for (const userIndex in users.records) {
                if (users.records[userIndex].name === nameForDelete) {
                    users.records.splice(userIndex, 1)
                    deletedCount++
                }
            }

            fs.writeFile(`${DATABASE_PATH}`, JSON.stringify(users), function (error) {
                if (error) {
                    write(response, 500, 'error in save database.')
                }
                else {
                    write(response, 200, `deleted count: ${deletedCount}`)
                }
            })
        }
    })
})


start();