import {createServer} from "http";

let controllers = [];

function start() {
    let myServer = createServer(function (request, response) {

        console.log("----------------------")
        console.log("request:", request.method, request.url);

        let data = ''
        request.on('data', chunk => data += chunk)

        request.on('end', () => {
            request.body = JSON.parse(data)
            router(request, response)
        })
    });

    myServer.listen(80, () => console.log("server run and listen on port 80..."));
}

function router(request, response) {
    let found = false;
    for (let item of controllers) {
        //if ("/" + item.path === request.url) {
        if (request.url.startsWith("/" + item.path)) {
            console.log("router ok:  ", request.url);
            item.func(request, response);
            found = true;
        }
    }
    if (!found) {
        let message = 'router fail: ' + request.url;
        console.log(message);
        write(response, 404, message)
    }
}

function use(path, func) {
    let item = {
        path: path,
        func: func
    };

    controllers.push(item);
}

function write(response, code, body){
    response.writeHead(code);
    response.write(body);
    response.end();
}

export {
    start,
    use,
    write
}