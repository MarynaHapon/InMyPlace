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
  res.render('place-info', {
    title: 'Places info',

    place: {
      name: 'Кафе \'Котовичі\'',
      address: 'Україна, м. Київ, вул. Кота Котовича, буд 9',
      rating: '5',
      facilities: ['Їжа', 'Холодні напої', 'Wi-Fi', 'Лаундж зона'],
      distance: '1500м',

      workHours: {
        title: 'Години роботи',

        body: [
          {'7:00 - 23:00': 'Понеділок - П\'ятниця'},
          {'7:00 - 24:00': 'Субота'},
          {'9:00 - 24:00': 'Неділя'}
        ]
      },

      map: {
        src: 'images/map.png',
        alt: 'map'
      },

      comments: {
        title: 'Відгуки',
        btn: 'Залишити відгук',

        body: [
          {
            name: 'Марина Гапон',
            date: '2 липня 2018р',
            rating: '4',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla.'
          }
        ]
      },

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