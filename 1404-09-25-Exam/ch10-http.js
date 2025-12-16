import { createServer } from "http";


let controllers = [];

function start() {
    const server = createServer(function (request, response) {
        let data = ''
        request.on('data', chunk => data += chunk)
        request.on('end', () => {
            try {
                request.body = JSON.parse(data)
            } catch (error) { }
            router(request, response)
        })
    });

    server.listen(80, () => console.log("server run and listen on port 80..."));
}

function router(request, response) {
    let found = false;

    for (let cotroller of controllers) {
        if (request.url.startsWith("/" + cotroller.path)) {
            cotroller.func(request, response);
            found = true;
        }
    }

    if (!found) {
        write(response, 404, 'route not found.')
    }
}

function use(path, func) {
    const controller = {
        path: path,
        func: func
    };

    controllers.push(controller);
}

function write(response, code, body) {
    response.writeHead(code);
    response.write(body);
    response.end();
}

export {
    start,
    use,
    write
}