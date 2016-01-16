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

    var socket = io('http://localhost:3001', { autoConnect: false }),
        connect, disconnect, emitLogin, subscribeEvents, unsubscribeEvents;

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
    }

    disconnect = function () {
        if (!socket.disconnected) {
            socket.disconnect();

            unsubscribeEvents();
        }
    }

    subscribeEvents = function () {
        socket.on('chat-peoplelist', function (data) {
            app.messenger.notify('peopleUpdated', data);
        });
    }

    unsubscribeEvents = function () {
        socket.off('chat-peoplelist');
    }

    emitLogin = function (userMap, callback) {
        var eventName = 'chat-login';

        connect(function () {
            console.log('emitLogin ' + socket.connected);
            if (socket.connected) {
                socket.once(eventName, function (res) {
                    callback(res);
                });

                socket.emit(eventName, userMap);
            }
        });
    }

    return {
        'emitLogin': emitLogin
    };
})();