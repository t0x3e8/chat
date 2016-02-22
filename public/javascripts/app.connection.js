/* global app */

// Connection object establishes connection with server 
// app.connection
// ===========================
// Properties and Methods
// * socket - represents the communication channel with server
// * connect() - opens connection with the server
// * disconnect() - closes connection with the server.
// * emitLogin() - sends request to server about login an user, and fires callback after all


app.connection = (function () {
    'use strict';
    
    var address = 'http://localhost:3001'; // window.location.protocol + '//' + window.location.host;
    var socket = io(address, { autoConnect: false }),
        connect, disconnect, emitLogin, subscribeEvents, unsubscribeEvents, emitMsg, receiveMsg;
    var peopleListEvent = 'chat-peoplelist',
        msgEvent = 'chat-msg';
        
        
    connect = function (callback) {
        if (!socket.connected) {
            socket.on('connect', function () {
                subscribeEvents();
                callback();
            });

            socket.connect();
        }
        else {
            callback();
        }
    };

    disconnect = function () {
        if (!socket.disconnected) {
            socket.disconnect();

            unsubscribeEvents();
        }
    };

    subscribeEvents = function () {
        socket.on(peopleListEvent, function (data) {
            app.messenger.notify('peopleUpdated', data);
        });
        
        socket.on(msgEvent, function(data) {
            app.messenger.notify('newMsg', data);
        })
    };

    unsubscribeEvents = function () {
        socket.off(peopleListEvent);
        socket.off(msgEvent);
    };

    emitLogin = function (userMap, callback) {
        var eventName = 'chat-login';

        connect(function () {
            console.log('Emitting login. Connected: ' + socket.connected);
            if (socket.connected) {
                socket.once(eventName, function (res) {
                    callback(res);
                });

                socket.emit(eventName, userMap);
            }
        });
    };

    emitMsg = function (msg, fromId, toId) {
        console.log('Emitting msg. Connected: ' + socket.connected);

        if (socket.connected) {
            socket.emit(msgEvent, { msg: msg, fromId: fromId, toId: toId });
        }
    };

    return {
        'emitLogin': emitLogin,
        'emitMsg': emitMsg
    };
})();