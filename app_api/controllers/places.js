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

    if ( (!lng && lng!==0) || (!lat && lat!==0)) {
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
    PlaceModel.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        workHours: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }, {
            days: req.body.days3,
            opening: req.body.opening3,
            closing: req.body.closing3,
            closed: req.body.closed3
        }]
    }, function (err, place) {
        if (err) {
            sendJsonResponse(res, 400, err);
        }
        else {
            sendJsonResponse(res, 201, place)
        }
    })
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
    if (!req.params.placeid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, placeid is required"
        });

        return;
    }

    PlaceModel
        .findById(req.params.placeid)
        .select('-comments -rating')
        .exec(function (err, place) {
            if (!place) {
                sendJsonResponse(res, 404, {
                    "message": "placeid not found"
                });

                return;
            }
            else if (err) {
                sendJsonResponse(res, 400, err);

                return;
            }

            place.name = req.body.name;
            place.address = req.body.address;
            place.facilities = req.body.facilities.split(',');
            place.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            place.workHours = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }, {
                days: req.body.days3,
                opening: req.body.opening3,
                closing: req.body.closing3,
                closed: req.body.closed3
            }];

            place.save(function (err, place) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                }
                else {
                    sendJsonResponse(res, 200, place);
                }
            });
        });
};

module.exports.placesDeleteOne = function (req, res) {
    var placeid = req.params.placeid;

    if (placeid) {
        PlaceModel
            .findByIdAndRemove(placeid)
            .exec(function (err, place) {
                if (err) {
                    sendJsonResponse(res, 404, err);

                    return;
                }

                sendJsonResponse(res, 204, null);
            });
    }
    else {
        sendJsonResponse(res, 404, {
            "message": "No placeid"
        });
    }
};