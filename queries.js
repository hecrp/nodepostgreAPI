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

function getTowns(req, res, next) {
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

function getIslands(req, res, next) {
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
    var town = req.params.town;
    var days = parseInt(req.params.days);

    db.any('select * ' +
           'from agendacultural inner join municipios ' +
           'on municipios.id = agendacultural.municipio ' +
           'where desmuni = $1 ' +
           'and fecini between CURRENT_DATE and (CURRENT_DATE + $2);'
           , [town, days])
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

//Cultural spaces queries

function getSpaces(req, res, next) {
    db.any('select * from espaciosagenda')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all values from espaciosagenda'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSpacesById(req, res, next) {
    var id = parseInt(req.params.id);

    db.one('select * from espaciosagenda' +
        'where id = $1', id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all values from espaciosagenda'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSpacesByIsland(req, res, next) {
    var island = parseInt(req.params.island);

    db.any('select * from espaciosagenda' +
        'where isla = $1', island)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all values from espaciosagenda'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSpacesByTown(req, res, next) {
    var town = parseInt(req.params.town);

    db.any('select * from espaciosagenda ' +
        'where municipio = $1', town)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all values from espaciosagenda'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getIslands: getIslands,
    getTowns: getTowns,
    getEventsByPage: getEventsByPage,
    getEventsById: getEventsById,
    getEventsByPlaceDate:getEventsByPlaceDate,
    getSpaces:getSpaces,
    getSpacesById:getSpacesById,
    getSpacesByIsland:getSpacesByIsland,
    getSpacesByTown:getSpacesByTown
};
