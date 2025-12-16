import { createServer } from "http";


const server =
    createServer(function (request, response) {
        if (request.url.startsWith("/ch7") && request.method === 'GET') {
            const params =
                request.url.split('ch7')[1]

            response.writeHead(200);
            response.write(params);
        }
        else {
            response.writeHead(404);
            response.write('route not found.');
        }

        response.end();
    })

server.listen(80, () => console.log("server run and listen on port 80..."));