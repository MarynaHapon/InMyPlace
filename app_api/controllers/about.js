var mongoose = require('mongoose');
var AboutModel = mongoose.model('About');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.aboutInfo = function (req, res) {
    AboutModel
        .find()
        .exec(function (err, results) {
            if (!results) {
                sendJsonResponse(res, 404, {
                    "message": "page about not found"
                });

                return;
            }
            else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }

            sendJsonResponse(res, 200, results);
        });
};