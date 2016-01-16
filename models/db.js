'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoURI = 'mongodb://localhost:27017/chatDB';
var userSchema;

userSchema = new Schema({
    name: { type: String },
    socketId: { type: String }
});

mongoose.model('User', userSchema);
mongoose.connect(mongoURI);

mongoose.connection.on('connected', function () {
    console.log('Connected with database.');
});

mongoose.connection.on('error', function (err) {
    console.log('Database error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Disconnected with database');
})

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});