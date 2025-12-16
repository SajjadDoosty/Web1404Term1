import { createServer } from "http";
import * as fs from 'fs';
const DATABASE_PATH = './database-http.json'

const server =
    createServer(function (request, response) {
        if (request.url.startsWith("/data") && request.method === 'DELETE') {
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
        }
        else {
            write(response, 404, 'route not found.')
        }
    })

server.listen(80, () => console.log("server run and listen on port 80..."));


function write(response, code, body) {
    response.writeHead(code);
    response.write(body);
    response.end();
}