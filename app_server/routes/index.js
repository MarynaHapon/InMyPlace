var express = require('express');
var router = express.Router();
var controllerPlaces = require('../controllers/places');
var controllerOthers = require('../controllers/others');

/* GET places */
router.get('/', controllerPlaces.homeList);
router.get('/place/:placeid', controllerPlaces.placeInfo);
router.get('/place/review/new', controllerPlaces.addReview);

/* GET other pages */
router.get('/about', controllerOthers.about);

module.exports = router;
