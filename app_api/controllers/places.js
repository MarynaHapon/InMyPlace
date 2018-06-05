var mongoose = require('mongoose');

var Place = mongoose.model('Place');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.placesListByDistance = function (req, res) {

};

module.exports.placesCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"})
};

module.exports.placesReadOne = function (req, res) {

};

module.exports.placesUpdateOne = function (req, res) {

};

module.exports.placesDeleteOne = function (req, res) {

};