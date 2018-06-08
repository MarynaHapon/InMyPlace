var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://infinite-falls-53721.herokuapp.com"
}

var renderHomePage = function (req, res, responseBody) {
    var message;

    if (!(responseBody instanceof Array)) {
        message = 'Помилка пошуку API';
        responseBody = [];
    }
    else {
        if(!responseBody.length) {
            message = 'Місць поруч не знайдено'
        }
    }

    res.render('places-list', {
        title: 'Список особливих місць',

        pageHeader: {
            title: 'In My Place - це сховище наших особливих місць',
            subtitle: 'Знаходитесь в пошуках особливого місця? Ми можемо вам дещо порадити.'
        },

        places: responseBody,
        message: message
    });
};

var formatDistance = function (distance) {
    var numDistance, unit;

    if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = ' км';
    }
    else {
        numDistance = parseFloat(distance * 1000,10);
        unit = ' м';
    }

    return numDistance + unit;
};

var getPlaceInfo = function (req, res, callback) {
    var path = "/api/places/" + req.params.placeid;

    var requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
       var data = body;

       if (response.statusCode === 200) {
           data.coords = {
               lng: body.coords[0],
               lat: body.coords[1]
           };

           callback(req, res, data);
       }
       else {
           showError(req, res, response.statusCode);
       }

    });
};

/* GET home page */
module.exports.homeList = function (req, res) {
  var path = '/api/places';
  var requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      lng: 50.500000032,
      lat: 30.5,
      maxDistance: 20
    }
  };

  request(requestOptions, function (err, response, body) {
      var data = body;

      if (response.statusCode === 200 && data.length) {
          for (var i = 0; i < data.length; i++) {
              data[i].distance = formatDistance(data[i].distance);
          }
      }

      renderHomePage(req, res, data);
  });
};

var renderPlaceInfoPage = function (req, res, placeInfo) {
    res.render('place-info', {
        title: placeInfo.name,
        place: placeInfo
    });
};

var showError = function (req, res, status) {
    var title, message;

    if (status === 400) {
        title = "404, сторінка не знайдена";
        message = "Схоже, ми не можемо знайти цю сторінку. Вибачте.";
    }
    else {
        title = status + ", щось пішло не так";
        message = "Упс, маємо помилку...";
    }

    res.status(status);
    res.render('error', {
        title: title,
        message: message
    })
};

/* GET place page */
module.exports.placeInfo = function (req, res) {
    getPlaceInfo(req, res, function (req, res, responseData) {
        renderPlaceInfoPage(req, res, responseData);
    });
};

var renderCommentForm = function (req, res, placeInfo) {
    res.render('place-comment-form', {
        title: placeInfo.name,
        name: placeInfo.name
    });
};

/* GET add comment page */
module.exports.addComment = function (req, res) {
    getPlaceInfo(req, res, function (req, res, responseData) {
        renderCommentForm(req, res, responseData);
    });
};

module.exports.doAddComment = function (req, res) {
    var placeid = req.params.placeid;
    var path = "/api/places/" + placeid + "/comments";

    var postdata = {
        name: req.body.name,
        rating: parseFloat(req.body.rating, 10),
        comment: req.body.comment
    };

    var requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };

    request(requestOptions, function (err, response, body) {
        if (response.statusCode === 201) {
            res.redirect('/place/' + placeid)
        }
        else {
            showError(req, res, response.statusCode);
        }
    });

};