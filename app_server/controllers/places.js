/* GET home page */
module.exports.homeList = function (req, res) {
  res.render('places-list', {
    title: 'Список особливих місць',

    pageHeader: {
      title: 'In My Place - це сховище наших особливих місць',
      subtitle: 'Знаходитесь в пошуках особливого місця? Ми можемо вам дещо порадити.'
    },

    places: [
      {
        name: 'Кафе \'Котовичі\'',
        address: 'Україна, м. Київ, вул. Кота Котовича, буд 9',
        rating: '5',
        facilities: ['Їжа', 'Холодні напої', 'Wi-Fi', 'Лаундж зона'],
        distance: '1500м',
        img: {
          src: 'https://bulma.io/images/placeholders/128x128.png',
          alt: 'Кафе Котовичі'
        }
      },
      {
        name: 'Кафе \'Котейро\'',
        address: 'Україна, м. Київ, вул. Кота Котовича, буд 10',
        rating: '1',
        facilities: ['Їжа', 'Холодні напої'],
        distance: '150м',
        img: {
          src: 'https://bulma.io/images/placeholders/128x128.png',
          alt: 'Кафе Котовичі'
        }
      },
      {
        name: 'Кафе \'Кітік\'',
        address: 'Україна, м. Київ, вул. Кота Котовича, буд 19',
        rating: '3',
        facilities: ['Їжа', 'Холодні напої', 'Wi-Fi'],
        distance: '300м',
        img: {
          src: 'https://bulma.io/images/placeholders/128x128.png',
          alt: 'Кафе Котовичі'
        }
      },
      {
        name: 'Кафе \'Кот\'',
        address: 'Україна, м. Київ, вул. Кота Котовича, буд 100',
        rating: '4',
        facilities: ['Їжа', 'Холодні напої', 'Wi-Fi', 'Жива музика', 'Фото зона'],
        distance: '750м',
        img: {
          src: 'https://bulma.io/images/placeholders/128x128.png',
          alt: 'Кафе Кот'
        }
      }
    ]
  });
};

/* GET places page */
module.exports.placeInfo = function (req, res) {
  res.render('place-info', { title: 'Places info' });
};

/* GET add review page */
module.exports.addReview = function (req, res) {
  res.render('place-review-form', { title: 'Add review' });
};