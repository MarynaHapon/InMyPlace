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

/* GET place page */
module.exports.placeInfo = function (req, res) {
    var path = '/api/places/' + req.params.placeid;
    var requestOptions = {
      url: apiOptions.server + path,
      method: "GET",
      json: {}
    };

    request(requestOptions, function (err, response, body) {
        var data = body;

        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };


        renderPlaceInfoPage(req, res, data);
    });
};


/* GET add review page */
module.exports.addReview = function (req, res) {
  res.render('place-review-form', {
    title: 'Add review',

    form: {
      title: 'Залишити відгук до',
      name: {
        label: 'Ваше ім\'я',
        placeholder: 'Ім\'я Прізвище'
      },
      rating: {
        label: 'Ваша оцінка'
      },
      comment: {
        label: 'Ваш відгук',
        placeholder: 'Ваш відгук'
      },
      btn: 'Залишити коментар'
    },

    place: {
      name: 'Кафе \'Котовичі\'',
      form: {
        name: '',
        rating: '',
        comment: ''
      }
    }
  });
};