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

/* GET places page */
module.exports.placeInfo = function (req, res) {
  res.render('place-info', {
    title: 'Places info',

    place: {
      name: 'Кафе \'Котовичі\'',
      address: 'Україна, м. Київ, вул. Кота Котовича, буд 9',
      rating: '5',
      facilities: ['Їжа', 'Холодні напої', 'Wi-Fi', 'Лаундж зона'],
      distance: '1500м',

      workHours: [
        {
          days: 'Понеділок - П’ятниця',
          opening: '7.00',
          closing: '21.00',
          closed: false
        },
        {
          days: 'Субота',
          opening: '8.00',
          closing: '21.00',
          closed: false
        },
        {
          days: 'Неділя',
          closed: true
        }
      ],

      map: {
        src: 'images/map.png',
        alt: 'map'
      },

      comments: [
        {
          name: 'Марина Гапон',
          date: '2 липня 2018р',
          rating: '4',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla.'
        }
      ],

      sidebar: {
        title: 'Дане місце є особливим',

        body: [
          'Притримується принципів унікальності і дружньої атмосфери, позиціонуючи себе як демократичне кафе.',
          'Наявність власної кухні в, приготування страв із свіжих продуктів (нема заморозки та напівфабрикатів), схема самообслуговування; для клієнта існує можливість створювати свої власні варіанти страв; максимальна візуалізація виготовлення брендових страв; демократична атмосфера закладів; ексклюзивність музичного супроводу.'
        ]
      }
    }
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