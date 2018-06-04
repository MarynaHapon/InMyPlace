var mongoose = require('mongoose');
var readLine = require('readline');
var dbURI = 'mongodb://localhost/InMyPlace';

/* Mongoose connection */
mongoose.connect(dbURI);

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