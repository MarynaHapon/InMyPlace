var mongoose = require('mongoose');
var AboutModel = mongoose.model('About');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.aboutInfo = function (req, res) {
    AboutModel
        .find()
        .exec(function (error, results) {
            sendJsonResponse(res, 200, results);
        });
};