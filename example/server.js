var http = require('http');
var ecstatic = require('ecstatic');

var st = ecstatic(__dirname + '/static');
var server = http.createServer(function (req, res) {
    st(req, res);
});
server.listen(8000);
