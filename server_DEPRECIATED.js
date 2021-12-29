const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    // Set Header Content Type
    res.setHeader('Content-type', 'text/html');

    // Write HTML to the requested page
    // res.write(`<p>Welcome to ${req.url}</p>`)

    // The path that the user visits
    let path = './views/';

    // Basic Routing
    switch(req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break
        // Redirect from about-me.html to about.html
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
        default:
            path += '404.html'
            res.statusCode = 404;
            break
    }

    // Write a full HTML document to the requested page
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        }

        // res.write(data)
        res.end(data)
    })

    // End the response
    // res.end()
})

const PORT = 3000

server.listen(PORT, 'localhost', () => {
    console.log(`Listening on port ${PORT}`)
})