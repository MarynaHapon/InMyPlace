var express = require('express');
var router = express.Router();
var controllerPlaces = require('../controllers/places');
var controllerComments = require('../controllers/comments');
var controllerAbout = require('../controllers/about');

/* Places */
/* READ List */
router.get('/places', controllerPlaces.placesListByDistance);

/* CREATE item */
router.post('/places', controllerPlaces.placesCreate);

/* READ item */
router.get('/places/:placeid', controllerPlaces.placesReadOne);

/* UPDATE item */
router.put('/places/:placeid', controllerPlaces.placesUpdateOne);

/* DELETE item */
router.delete('/places/:placeid', controllerPlaces.placesDeleteOne);

/* Comment */
/* CREATE comment */
router.post('/places/:placeid/comments', controllerComments.commentsCreate);

/* READ comment */
router.get('/places/:placeid/comments/:commentid', controllerComments.commentsReadOne);

/* UPDATE comment */
router.put('/places/:placeid/comments/:commentid', controllerComments.commentsUpdateOne);

/* DELETE comment */
router.delete('/places/:placeid/comments/:commentid', controllerComments.commentsDeleteOne);

/* About */
/* GET About page */
router.get('/about', controllerAbout.aboutInfo);


module.exports = router;