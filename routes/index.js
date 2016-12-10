var express = require('express');
var router = express.Router();

var db = require('../queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cultural Events' });
});

router.get('/api/islands', db.getIslands);
router.get('/api/towns', db.getTowns);

router.get('/api/event/list/:page', db.getEventsByPage);
router.get('/api/event/:id', db.getEventsById);
router.get('/api/event/:town/:date', db.getEventsByPlaceDate);

router.get('/api/culturalspace/list', db.getSpaces);
router.get('/api/culturalspace/:id', db.getSpacesById);
router.get('/api/culturalspace/island/:island', db.getSpacesByIsland);
router.get('/api/culturalspace/town/:town', db.getSpacesByTown);


module.exports = router;
