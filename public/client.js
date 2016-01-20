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
function nexioChat(options) {


    nexioChat.prototype.room;
    // usuario se registra en una incidencia del servidor
    nexioChat.prototype.join = function (incidents) {

        if(incidents === undefined){

        }else {
            if(Array.isArray(incidents)){
                // no op
            }else{
                incidents = [incidents]; // parse to array
            }
            incidents.forEach(function (incident) {
                if (nexioChat.prototype.room === undefined) {
                    // noop
                } else {
                    nexioChat.prototype.socket.emit('leave', nexioChat.prototype.room);
                }
                // no op if the room is not changing.. todo
                nexioChat.prototype.socket.emit('join', incident); // the client join some incident room
                nexioChat.prototype.room = incident; // update to current room
            });
        }

    };

    // usuario envia una notificación al servidor, para forwarding
    nexioChat.prototype.notify = function (incident) {
        nexioChat.prototype.socket.emit('notify', incident);
        // the server should:
        // io.to(incident).emit('onmessage');
    };

    nexioChat.prototype.listen = function () {
        nexioChat.prototype.socket.on('onmessage', function (incident) {
            console.log("received message from: " + incident);
            // here comes the js controller to refresh the chat view.
            nexioChat.prototype.callback(incident);
        });
    }

    nexioChat.prototype.init = function (options) {
        nexioChat.prototype.socket = options.hasOwnProperty('url') ? io(options.url) : io();
        nexioChat.prototype.callback = options.hasOwnProperty('callback') ? options.callback : function(){
            console.log('Custome callack here:' +
                'nexioChat.prototype.callback = function');
        };
        nexioChat.prototype.listen();
        nexioChat.prototype.join(options.incidents)
    };


    nexioChat.prototype.init(options === undefined ? {} : options);
}
