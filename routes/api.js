var express = require('express');
var router = express.Router();

var db = require('../queries')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/islands', db.getIslands);
router.get('/towns', db.getTowns);
router.get('/towns/island/:island', db.getTownsByIsland);
router.get('/town/:id', db.getTownById);

router.get('/event/list/:page', db.getEventsByPage);
router.get('/event/notposted', db.getNotValidatedEvents);
router.get('/event/:id', db.getEventsById);
router.get('/event/:town/:days', db.getEventsByPlaceDate);

router.get('/culturalspace/list', db.getSpaces);
router.get('/culturalspace/:id', db.getSpacesById);
router.get('/culturalspace/town/:town', db.getSpacesByTown);

router.post('/user', db.getUser);

router.put('/validate/:id', db.validateEvent);

router.post('/event', db.postEvent);
router.post('/space', db.postSpace);


module.exports = router;
