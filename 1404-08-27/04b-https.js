import http from "http"

const server = http.createServer((request, response) => {
    response.write("your request url: " + request.url)
    response.end()
})

server.listen(80)