'use strict';

var chatController = function (io) {
    require('../models/db');

    var emitPeopleList;
    var mongoose = require('mongoose');
    var User = mongoose.model('User');
    var loginEvent = 'chat-login';
    var logoutEvent = 'chat-logout';
    var peopleListEvent = 'chat-peoplelist';

    emitPeopleList = function (socket) {
        User
            .find()
            .exec(function (err, users) {
                socket.emit(peopleListEvent, users);
            });
    };

    io.on('connection', function (socket) {
        console.log('client connected');

        socket.on(loginEvent, function (userMap) {
            var user = new User();
            user.name = userMap.name;
            user.socketId = socket.id;

            user.save(function (err, res) {
                socket.emit(loginEvent, { succeded: err === null, user: user });
                emitPeopleList(socket);

                console.log('Client connected and added. Err: ' + err + ', Result: ', res.toString());
            });
        });

        socket.on(logoutEvent, function (userMap) {
        });

        socket.on('leave', function () {
            User.findOne({ socketId: socket.id })
                .exec(function (err, user) {
                    if (err === null && user !== null) {
                        user.remove(function (err) {
                            console.log('Client disconnected and removed. Err: ' + err + 'SocketId : ' + socket.id);

                            emitPeopleList(socket);
                        });
                    }
                });
        });

        socket.on('disconnect', function (data) {
            User.findOne({ socketId: socket.id })
                .exec(function (err, user) {
                    if (err === null && user !== null) {
                        user.remove(function (err) {
                            console.log('Client disconnected and removed. Err: ' + err + 'SocketId : ' + socket.id);

                            emitPeopleList(socket);
                        });
                    }
                });
        })
    });
}


module.exports = chatController;