var mongoose = require('mongoose');

var PlaceModel = mongoose.model('Place');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var theEarth = (function () {
    var earthRadius = 6371;

    var getDistanceFromRads = function (rads) {
        return parseFloat(rads * earthRadius);
    };

    var getRadsFromDistance = function (distance) {
        return parseFloat(distance / earthRadius);
    };

    return {
        getDistanceFromRads : getDistanceFromRads,
        getRadsFromDistance : getRadsFromDistance
    };
})();

module.exports.placesListByDistance = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    if (!lng || !lat) {
        sendJsonResponse(res, 404, {
            "message": "lng and lat query parameters are required"
        });

        return;
    }
    
    PlaceModel.aggregate(
        [{
            $geoNear: {
                'near': {'type': 'Point', 'coordinates': [lng, lat]},
                'spherical': true,
                'maxDistance': theEarth.getRadsFromDistance(20),
                'num':10,
                'distanceField': 'dist'
            }
        }], function(err, results) {
            var places = [];

            if (err) {
                sendJsonResponse(res, 404, err);
            }
            else {
                results.forEach(function (doc) {
                    places.push({
                        distance: theEarth.getDistanceFromRads(doc.dist),
                        name: doc.name,
                        address: doc.address,
                        facilities: doc.facilities,
                        rating: doc.rating,
                        _id: doc._id
                    });
                });

                sendJsonResponse(res, 200, places);
            }
        });
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