var express = require('express');
var app = express();

var http = require('http').Server(app);

var port = process.env.PORT || 8080;

var io = require('socket.io')(http);
// socket bind to http server


app.use('/', express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/bower_components'));

app.get('/client', function (req, res) {
    res.sendFile(__dirname + '/client.html');
});

app.get('/', function (req, res) {
    res.send('<h1>Hello server Up!!!</h1>');
});

// listening on incomming connections
io.on('connection', function (socket) {
    console.log('['+socket.id+'] -> Connected!');

    socket.on('disconnect', function(){
        console.log('['+socket.id+'] -> Disconnected!');
    });

    socket.on('join', function(room){
        console.info('['+socket.id+'] -> '+room);
        socket.join(room);
    });


    socket.on('notify', function(incident){
        console.info('['+socket.id+'] -> '+incident);
        socket.to(incident).emit('onmessage', incident);
    });












});


http.listen(port, function () {
    console.log('listening on port *:' + port)
});