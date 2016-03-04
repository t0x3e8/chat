'use strict';

var chatController = function (io) {
    require('../models/db');

    var emitPeopleList;
    var debug = require('debug')('chat:socket');
    var mongoose = require('mongoose');
    var User = mongoose.model('User');

    var loginEvent = 'chat-login';
    var logoutEvent = 'chat-logout';
    var peopleListEvent = 'chat-peoplelist';
    var msgEvent = 'chat-msg';

    emitPeopleList = function () {
        User
            .find()
            .exec(function (err, users) {
                io.emit(peopleListEvent, users);
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
                // debug('Client connected and added. Err: ' + err + ', Result: ');
            });
        });

        socket.on(msgEvent, function (msgMap) {
            var msg = msgMap.msg;
            var fromId = msgMap.fromId;
            var toId = msgMap.toId;

            User.findById(toId, function (err, recipient) {
                if (recipient !== null && io.sockets.connected[recipient.socketId])
                    io.sockets.connected[recipient.socketId].emit(msgEvent, { msg: msg, fromId: fromId });
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