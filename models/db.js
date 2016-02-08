'use strict';

var mongoose = require('mongoose');
var debug = require('debug')('chat:db');
var Schema = mongoose.Schema;
// var mongoURI = 'mongodb://localhost:27017/chatDB';
// var mongoURI = 'mongodb://192.168.1.9:27017/chatDB';
// var mongoURI = 'mongodb://13.69.198.188:27017/chatDB';
var mongoURI = 'mongodb://10.0.1.4:27017/chatDB';

var userSchema;

userSchema = new Schema({
    name: { type: String },
    socketId: { type: String }
});

mongoose.model('User', userSchema);
mongoose.connect(mongoURI, function(err) {
    if (err)
        debug('Error while connecting to database: ' + err);
});

mongoose.connection.on('connected', function () {
    debug('Server connected with database.');
    var User = mongoose.model('User');
    
    debug('Connected with database.');
    
    User.remove({}, function(err) {
        if (err) {
            debug('Error while removing records: ' + err);
        }
        
        debug('Database ready');
    });
});

mongoose.connection.on('error', function (err) {
    debug('Connection with database with error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    debug('Server has disconnected with database.');
})

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});