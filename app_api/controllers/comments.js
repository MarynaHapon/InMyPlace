var mongoose = require('mongoose');
var PlaceModel = mongoose.model('Place');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.commentsCreate = function (req, res) {

};

module.exports.commentsReadOne = function (req, res) {
    if(req.params && req.params.placeid && req.params.commentid) {

        PlaceModel
            .findById(req.params.placeid)
            .select('name comments')
            .exec(function (err, place) {
                var response, comment;

                if(!place) {
                    sendJsonResponse(res, 404, {
                        "message": "place not found"
                    });
                    return;
                }
                else if(err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

                if(place.comments && place.comments.length > 0) {
                    comment = place.comments.id(req.params.commentid);

                    if(!comment) {
                        sendJsonResponse(res, 404, {
                            "message": "commentid not found"
                        });
                    }
                    else {
                        response = {
                            place: {
                                name: place.name,
                                id: req.params.placeid
                            },
                            comment: comment
                        };
                    }

                    sendJsonResponse(res, 200, response);
                }
                else {
                    sendJsonResponse(res, 404, {
                        "message": "No comments found"
                    });
                }
            });
    }
    else {
        sendJsonResponse(res, 404, {
            "message": "Not found, placeid and commentid are both required"
        });
    }
};

module.exports.commentsUpdateOne = function (req, res) {

};

module.exports.commentsDeleteOne = function (req, res) {

};