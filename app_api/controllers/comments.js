var mongoose = require('mongoose');
var PlaceModel = mongoose.model('Place');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var updateAverageRating = function () {
    PlaceModel
        .findById(placeid)
        .select('rating comments')
        .exec(function (err, place) {
            if (!err) {
                doSetAverageRating(place);
            }
        });
};

var doSetAverageRating = function (place) {
    var i, commentCount, ratingAverage, ratingTotal;

    if (place.comments && place.comments.length > 0) {
        commentCount = place.comments.length;
        ratingTotal = 0;

        for (i = 0; i < commentCount; i++) {
            ratingTotal = ratingTotal + place.comments[i].rating;
        }

        ratingAverage = parseInt(ratingTotal / commentCount, 10);
        place.rating = ratingAverage;

        place.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Average rating update to ', ratingAverage)
            }
        })
    }
};

var doAddComment = function (req, res, place) {
  if (!place) {
      sendJsonResponse(res, 404, {
         "message": "placeid not found"
      });
  }
  else {
      place.comments.push({
         name: req.body.name,
         rating: req.body.rating,
         comment: req.body.comment
      });

      place.save(function (err, place) {
          var thisComment;

          if (err) {
              sendJsonResponse(res, 400, err);
          }
          else {
              updateAverageRating(place._id);
              thisComment = place.comments[place.comments.length - 1];
              sendJsonResponse(res, 201, thisComment);
          }
      })
  }
};

module.exports.commentsCreate = function (req, res) {
    var placeid = req.params.placeid;

    if (placeid) {
        PlaceModel
            .findById(placeid)
            .select('comments')
            .exec(function (err, place) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                }
                else {
                    doAddComment(req, res, place);
                }
            });
    }
    else {
        sendJsonResponse(res, 404, {
            "message": "Not found, placeid is required"
        });
    }
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
    if (!req.params.placeid || !req.params.commentid) {
        sendJsonResponse(res, 404, {
           "message": "Not found, placeid and commentid are both required"
        });

        return;
    }

    PlaceModel
        .findById(req.params.placeid)
        .select('comments')
        .exec(function (err, place) {
            var thisComment;

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

            if (place.comments && place.comments.length > 0) {
                thisComment = place.comments.id(req.params.commentid);

                if (!thisComment) {
                    sendJsonResponse(res, 404, {
                        "message": "commentid not found"
                    });
                }
                else {
                    thisComment.name = req.body.name;
                    thisComment.rating = req.body.rating;
                    thisComment.comment = req.body.comment;

                    place.save(function (err, place) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        }
                        else {
                            updateAverageRating(place._id);
                            sendJsonResponse(res, 200, thisComment);
                        }
                    });
                }
            }
            else {
                sendJsonResponse(res, 404, {
                    "message": "No comment to update"
                })
            }
        })
};

module.exports.commentsDeleteOne = function (req, res) {
    if (!req.params.placeid || !req.params.commentid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, placeid and commentid are both required"
        });

        return;
    }

    PlaceModel
        .findById(req.params.placeid)
        .select('comments')
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

            if (place.comments && place.comments.length > 0) {
                if (!place.comments.id(req.params.commentid)) {
                    sendJsonResponse(res, 404, {
                        "message": "commentid not found"
                    })
                }
                else {
                    place.comments.id(req.params.commentid).remove();

                    place.save(function (err) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        }
                        else {
                            updateAverageRating(place._id);
                            sendJsonResponse(res, 204, null);
                        }
                    });
                }
            }
            else {
                sendJsonResponse(res, 404, {
                    "message": "No comment to delete"
                });
            }
        })
};