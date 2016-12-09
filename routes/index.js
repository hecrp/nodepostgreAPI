var express = require('express');
var router = express.Router();

var db = require('../queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cultural Events' });
});

router.get('/api/islas', db.getIslas);
router.get('/api/municipios', db.getMunicipios)
router.get('/api/lista/:page', db.getEventsByPage)
router.get('/api/evento/:id', db.getEventsById)
router.get('/api/evento/:municipio/:fecha', db.getEventsByPlaceDate)



module.exports = router;
