/* GET home page */
module.exports.homeList = function (req, res) {
  res.render('index', { title: 'Home' });
};

/* GET places page */
module.exports.placeInfo = function (req, res) {
  res.render('index', { title: 'Places info' });
};

/* GET add review page */
module.exports.addReview = function (req, res) {
  res.render('index', { title: 'Add review' });
};