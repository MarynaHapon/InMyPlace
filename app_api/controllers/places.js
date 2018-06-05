var mongoose = require('mongoose');

var PlaceModel = mongoose.model('Place');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.placesListByDistance = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"})
};

module.exports.placesCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"})
};

module.exports.placesReadOne = function (req, res) {
    if(req.params && req.params.placeid) {

        PlaceModel
            .findById(req.params.placeid)
            .exec(function (err, place) {

                if(!place) {
                    sendJsonResponse(res, 404, {
                        "message": "placeid not found"
                    });
                    return;
                }

                else if(err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                sendJsonResponse(res, 200, place);
            });
    }

    else {
        sendJsonResponse(res, 404, {
            "message": "No placeid in request"
        });
    }

};

module.exports.placesUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"})
};

module.exports.placesDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"})
};