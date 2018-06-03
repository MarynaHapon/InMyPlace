/* GET about page. */
module.exports.about = function (req, res) {
  res.render('generic-text', {
    title: 'Generic text',

    about: {
      title: 'Про нас',

      items: [
        {
          title: 'Артеміс',
          subtitle: 'marynahapon@gmail.com',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
          date: '11:09 PM - 1 Jan 2018',

          banner: {
            src: 'images/cat.gif',
            alt: 'image'
          },

          img: {
            src: 'images/cat-white.jpg',
            alt: 'image'
          }
        },
        {
          title: 'Діана',
          subtitle: 'marynahapon@gmail.com',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
          date: '11:09 PM - 1 Jan 2018',

          banner: {
            src: 'images/cat-smart.gif',
            alt: 'image'
          },

          img: {
            src: 'images/cat-white.jpg',
            alt: 'image'
          }
        },
        {
          title: 'Луна',
          subtitle: 'marynahapon@gmail.com',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
          date: '11:09 PM - 1 Jan 2018',

          banner: {
            src: 'images/cat-cute.gif',
            alt: 'image'
          },

          img: {
            src: 'images/cat-white.jpg',
            alt: 'image'
          }
        }
      ]
    }
  });
};