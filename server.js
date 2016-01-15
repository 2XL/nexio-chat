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
var onlineClient = {};
io.on('connection', function (socket) {
    console.log('a user has connected!!!', socket.id);

    onlineClient[socket.id] = socket;

    socket.on('disconnect', function(){
        console.log('user has disconnected');
        onlineClient[socket.id] = null;
    });



    socket.on('message', function(msg, target){
        console.log(msg);
        if(!(target in onlineClient))
            return; // noop
        var clientSocket = onlineClient[target];
        if(clientSocket === null){
            // noop : client got DC
        }else{
            // notify has message.
            clientSocket.emit('onmessage');
        }
    });












});


http.listen(port, function () {
    console.log('listening on port *:' + port)
});