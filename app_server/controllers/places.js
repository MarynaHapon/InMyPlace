/* GET home page */
module.exports.homeList = function (req, res) {
  res.render('places-list', { title: 'Список особливих місць' });
};

/* GET places page */
module.exports.placeInfo = function (req, res) {
  res.render('place-info', { title: 'Places info' });
};

/* GET add review page */
module.exports.addReview = function (req, res) {
  res.render('index', { title: 'Add review' });
};