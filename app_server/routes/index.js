var express = require('express');
var router = express.Router();
var controllerPlaces = require('../controllers/places');
var controllerOthers = require('../controllers/about');

/* GET places */
router.get('/', controllerPlaces.homeList);
router.get('/place/:placeid', controllerPlaces.placeInfo);
router.get('/place/:placeid/comments/new', controllerPlaces.addComment);
router.post('/place/:placeid/comments/new', controllerPlaces.doAddComment);

/* GET other pages */
router.get('/about', controllerOthers.about);

module.exports = router;
