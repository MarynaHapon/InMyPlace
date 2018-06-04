var mongoose = require('mongoose');
var readLine = require('readline');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/InMyPlace';

/* Mongoose connection */
mongoose.connect(dbURI);

/* Connection events */
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

/* Higher-order message function with close Mongoose connection */
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through' + msg);
        callback();
    })
};

/* SIGINT listening */
if (process.platform === 'win32'){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stout
    });

    rl.on ('SIGINT', function () {
        process.emmit('SIGINT')
    });
}

/* SIGUSR2 listening for nodemon reload */
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2')
    })
});

/* SIGINT listening for app termination */
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

/* SIGTERM listening for Heroku app shutdown */
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

/* Mongoose schema */
require('./places');