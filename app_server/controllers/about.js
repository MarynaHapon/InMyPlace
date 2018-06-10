var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://infinite-falls-53721.herokuapp.com"
}

var renderAboutPage = function (req, res, responseBody) {
    var data = responseBody[0];

    res.render('generic-text', {
        about: data
    });
};

/* GET about page. */
module.exports.about = function (req, res) {
    var path = '/api/about';
    var requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        renderAboutPage(req, res, body);
    });
};