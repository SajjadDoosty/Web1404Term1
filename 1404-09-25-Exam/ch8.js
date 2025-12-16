import { createServer } from "http";
import * as fs from 'fs';
const DATABASE_PATH = './database-http.json'


const server =
    createServer(function (request, response) {
        let data = ''
        request.on('data', chunk => data += chunk)
        request.on('end', () => {
            if (request.url.startsWith("/data") && request.method === 'POST') {
                try {
                    const userJson = JSON.parse(data)

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
                                    write(response, 200, 'database saved.')
                                }
                            })
                        }
                    })
                } catch (error) {
                    write(response, 500, 'error while procceing.')
                }
            }
            else {
                write(response, 404, 'route not found.')
            }
        })
    })

server.listen(80, () => console.log("server run and listen on port 80..."));


function write(response, code, body) {
    response.writeHead(code);
    response.write(body);
    response.end();
}