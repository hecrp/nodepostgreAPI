//Db connection

//Replace ES6 with Bluebird
var promise = require('bluebird');

//Use promiselib for db interactions
var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

//Connection
var connectionString = 'postgres://usuario:password@localhost:5432/agenda';
var db = pgp(connectionString);

// Query functions

function getMunicipios(req, res, next) {
    db.any('select * from municipios')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all values from municipios'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getIslas(req, res, next) {
    db.any('select * from islas')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all values from islas'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getEventsByPage(req, res, next) {
    var page = (parseInt(req.params.page) -1) * 10;
    db.any('select * from agendacultural ' +
           'where fecini > CURRENT_DATE ' +
           'order by fecini ' +
           'limit 10 offset $1;', page)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a page'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getEventsById(req, res, next) {
    var id = parseInt(req.params.id);
    db.one('select * from agendacultural where id = $1', id)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a page'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getEventsByPlaceDate(req, res, next) {
    var municipio = parseInt(req.params.municipio);
    var fecha = parseInt(req.params.fecha);

    db.any('select * ' +
           'from agendacultural inner join municipios ' +
           'on municipios.id = agendacultural.municipio' +
           'where desmuni = $1 and fech;', municipio, fecha)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a page'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

//select fecini from agendacultural where fecini > CURRENT_DATE order by fecini limit 10;

module.exports = {
    getIslas: getIslas,
    getMunicipios: getMunicipios,
    getEventsByPage: getEventsByPage,
    getEventsById: getEventsById,
    getEventsByPlaceDate:getEventsByPlaceDate
};