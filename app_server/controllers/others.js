/* GET about page. */
module.exports.about = function (req, res) {
  res.render('generic-text', { title: 'Page About' });
};