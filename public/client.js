// alert("Here goes the client script");
console.log("Client socket io handler api"); // each of the client will conect to the node server and register its identifier
// (this identifier should be unique among all the users and also has to be persistent)


// socket code
// load socket.io-client
/*
 var socket = io(); // its default is to serve from the host page.
 */


// add listener on Enter key to send message (emit whatever)

/**
 * Utils:
 * retrieve get perameters
 */
function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}


/**
 * this will be the content of client.js
 * url is the location of the
 */
var nexioChat = new (function() {


    var onMessageCallback = function(){
        console.log("To be SET")
    };

    this.setCallback = function(cb){
        console.log("set Callback as", cb);
        onMessageCallback = cb;
    };
    this.room = undefined;
    // usuario se registra en una incidencia del servidor
    this.join = function (incidents) {

        if(incidents === undefined){

        }else {
            if(Array.isArray(incidents)){
                // no op
            }else{
                incidents = [incidents]; // parse to array
            }
            incidents.forEach(function (incident) {
                if (nexioChat.room === undefined) {
                    // noop
                } else {
                    nexioChat.socket.emit('leave', nexioChat.room);
                }
                // no op if the room is not changing.. todo
                nexioChat.socket.emit('join', incident); // the client join some incident room
                nexioChat.room = incident; // update to current room
            });
        }

    };

    // usuario envia una notificación al servidor, para forwarding
    this.notify = function (incident) {
        nexioChat.socket.emit('notify', incident);
        // the server should:
        // io.to(incident).emit('onmessage');
    };

    this.listen = function () {
        nexioChat.socket.on('onmessage', function (incident) {
            console.log("received message from: " + incident);
            // here comes the js controller to refresh the chat view.
            onMessageCallback(incident)
        });
    };

    this.init = function (options) {
        options = options === undefined ? {} : options;
        nexioChat.socket = options.hasOwnProperty('url') ? io(options.url) : io();
        onMessageCallback = options.hasOwnProperty('callback') ? options.callback : function(){
            console.log('Custome callack here:' +
                'nexioChat.callback = function');
        };
        nexioChat.listen();
        // nexioChat.join(options.incidents)
    };

})();

nexioChat.init({url: 'http://localhost:8080'});
console.log(nexioChat);
// module.exports(nexioChat);
