//Db connection

//Replace ES6 with Bluebird
var promise = require('bluebird');
var config = require('./config/config.js');



//Use acpromiselib for db intertions
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

function getTownsByIsland(req, res, next) {
    var id = parseInt(req.params.island)
    db.any('select * from municipios where idisla = $1', id)
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

function getTownById(req, res, next) {
    var id = parseInt(req.params.id)
    db.any('select * from municipios where id = $1', id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved municipio'
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
    db.any('select agendacultural.id, agendacultural.titulo, agendacultural.subtitulo,' +
        ' agendacultural.fecini, agendacultural.imagen, ' +
        'espaciosagenda.denominacion, espaciosagenda.id as idespacio, ' +
        'municipios.id as idmuni, municipios.desmuni, ' +
        'islas.isla, islas.id as idisla ' +
        'from agendacultural ' +
        'inner join municipios on municipios.id = agendacultural.municipio ' +
        'inner join islas on islas.id = agendacultural.isla ' +
        'inner join espaciosagenda on espaciosagenda.id = agendacultural.espacio ' +
           'where fecini > \'2016-12-01\' ' +
            'and publicar = \'S\' ' +
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

function getNotValidatedEvents(req, res, next) {
    db.any('select * from agendacultural where publicar = \'N\'')
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
            'and publicar = \'S\' ' +
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

    db.one('select * from espaciosagenda ' +
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

function getSpacesByTown(req, res, next) {
    var town = parseInt(req.params.town);

    db.any('select * from espaciosagenda ' +
        'where idmuni = $1', town)
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

function postEvent(req, res, next){
    var event = req.body;
    console.log(req.body);      // your JSON

    db.none('insert into agendacultural ' +
        'values (default, \'N\', \'1\', ${fecini}, ${fecfin}, ${dias}, \'0\', ${isla},' +
        ' ${municipio}, ${espacio}, ${lugar}, ${titulo}, ${subtitulo}, ${descripcion}, ${hora}, ${minuto},' +
        ' ${imagen}, ${masinfo}, \'U\', ${usuario}, ${fechor})'
        , event).then(function (data) {
        res.status(200)
            .json({
                status: 'success',
                message: 'Added new row to agendacultural'
            });
    })
        .catch(function (err) {
            return next(err);
        });
}


function postSpace(req, res, next){
    var event = req.body;
    console.log(req.body);      // your JSON

    db.none('insert into espaciosagenda ' +
        'values (default, \'n\', \'n\', \'n\', \'n\', \'n\', \'n\', \'n\',' +
        ' \'n\', \'n\', \'n\', \'n\', \'n\', \'n\', ${idmuni}, ${denominacion}, ${direccion},' +
        ' ${codpos}, ${telefono}, ${fax}, ${mail}, ${web}, ${horario}, ${instalaciones},' +
        ' ${aforo}, \'1\', ${facebook}, ${youtube}, ${twitter}, ${imag01}, \'null\', ' +
        '\'null\', \'null\', ${lat}, ${lng}, \'null\')'
        , event).then(function (data) {
        res.status(200)
            .json({
                status: 'success',
                message: 'Added new space'
            });
    })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getIslands: getIslands,
    getTowns: getTowns,
    getTownsByIsland:getTownsByIsland,
    getEventsByPage: getEventsByPage,
    getTownById:getTownById,
    getEventsById: getEventsById,
    getEventsByPlaceDate:getEventsByPlaceDate,
    getNotValidatedEvents:getNotValidatedEvents,
    getSpaces:getSpaces,
    getSpacesById:getSpacesById,
    getSpacesByTown:getSpacesByTown,
    postEvent:postEvent,
    postSpace:postSpace,
};
