import { createServer } from "http";


const server =
    createServer(function (request, response) {
        console.log("request received.")
        response.end();
    })

server.listen(80, () => console.log("server run and listen on port 80..."));