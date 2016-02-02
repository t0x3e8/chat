'use strict';

var chatController = function (io) {
    require('../models/db');

    var emitPeopleList;
    var debug = require('debug')('chat:socket');
    var util = require("util");
    var mongoose = require('mongoose');
    var User = mongoose.model('User');
    
    var loginEvent = 'chat-login';
    var logoutEvent = 'chat-logout';
    var peopleListEvent = 'chat-peoplelist';

    emitPeopleList = function () {
        User
            .find()
            .exec(function (err, users) {
                io.emit(peopleListEvent, users);
                // io.emit(peopleListEvent, [{name:'jarek'}, {name:'aga'} ]);
            });
    };

    io.on('connection', function (socket) {
        debug('client connected ' + socket.id);

        socket.on(loginEvent, function (userMap) {
            var user = new User();
            user.name = userMap.name;
            user.socketId = socket.id;

            user.save(function (err, res) {
                socket.emit(loginEvent, { succeded: err === null, user: user });
                emitPeopleList();
// console.log(util.format("Format the object: %0", res));
                // debug('Client connected and added. Err: ' + err + ', Result: ');
            });
        });

        socket.on(logoutEvent, function (userMap) {
        });

        socket.on('leave', function () {
            User.findOne({ socketId: socket.id })
                .exec(function (err, user) {
                    if (err === null && user !== null) {
                        user.remove(function (err) {
                            debug('Client disconnected and removed. Err: ' + err + 'SocketId : ' + socket.id);

                            emitPeopleList();
                        });
                    }
                });
        });

        socket.on('disconnect', function (data) {
            User.findOne({ socketId: socket.id })
                .exec(function (err, user) {
                    if (err === null && user !== null) {
                        user.remove(function (err) {
                            debug('Client disconnected and removed. Err: ' + err + 'SocketId : ' + socket.id);

                            emitPeopleList();
                        });
                    }
                });
        })
    });
}


module.exports = chatController;