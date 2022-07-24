const express = require('express'), http = require('http');

const hostname = 'localhost';
const port = 8080;
const app = express();

const sample_server = http.createServer(app);

sample_server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/test/:name?', function (req, res) {
    console.log("/monkey");
    let name = req.query.name;
    res.send( '<h1>hello ' + name + '</h1>');
});

app.get('/add/:n1?/:n2?', function (req, res) {
    console.log("/monkey");
    let number1 = req.query.n1;
    let number2 = req.query.n2;
    let number3 = parseInt(number1) + parseInt(number2);
    res.send( '<h1>n1 = '
        + number1 +
        '<br/> n2 = '
        + number2 +
        '<br/> n3 = '
        + number3 +
        '</h1>');
});

app.get('/', function (req, res) {
    console.log("/home");
    res.send('<h1>home</h1>');
});