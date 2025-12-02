import { use, start, write } from "./06a-httpFramework.js";
import * as fs from 'fs';

use("index.html", function (request, response) {
    response.write(`
        <html>
            <head>
                <title>hello!</title>
            </head>
            <body>
                <b>Hello!</b>
                <img src='http://127.0.0.1/file/x.jpg'>
            </body>
        </html>
    `);
    response.end();
});


use("file", function (request, response) {
    let urlArray = request.url.split('/');
    let fileName = urlArray[2];

    readFile(fileName, function (error, fileBody) {
        if (error) {
            let message = 'file server error:' + error;
            console.log(message);
            // response.writeHead(404);
            // response.write(message);
            // response.end();
            write(response, 404, message);
        }
        else {
            // response.writeHead(200);
            // response.write(fileBody);
            // response.end();
            write(response, 200, fileBody);
        }
    })
});

use("sum", function (request, response) {
    const inputs =
        request.url.split('/').splice(2)

    write(response, 200, (parseInt(inputs[0]) + parseInt(inputs[1])).toString())
})

use("createfile", function (request, response) {
    const inputs =
        request.url.split('/').splice(2)

    const path = inputs[0]
    const data = inputs[1] ?? ''

    fs.writeFileSync(path, data)

    write(response, 200, `file ${inputs[0]} created.`)
})

use("signup", function (request, response) {
    const user = request.body.user
    const pass = request.body.pass

    let users = JSON.parse(fs.readFileSync('users.json'))

    users.push({ user: user, pass: pass })

    fs.writeFileSync('users.json', JSON.stringify(users))

    write(response, 200, `Ok.`)
})

start();