const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const serveer = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('I love Toasty, from NodeJS');
});

serveer.listen(port, hostname, () => {
    console.log(`server listening on http://${hostname}:${port}`)
})