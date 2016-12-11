var express = require('express');
var router = express.Router();

var db = require('../queries')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/islands', db.getIslands);
router.get('/towns', db.getTowns);

router.get('/event/list/:page', db.getEventsByPage);
router.get('/event/:id', db.getEventsById);
router.get('/event/:town/:days', db.getEventsByPlaceDate);

router.get('/culturalspace/list', db.getSpaces);
router.get('/culturalspace/:id', db.getSpacesById);
router.get('/culturalspace/island/:island', db.getSpacesByIsland);
router.get('/culturalspace/town/:town', db.getSpacesByTown);


module.exports = router;
