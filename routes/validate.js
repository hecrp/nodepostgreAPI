var express = require('express');
var jwt    = require('jsonwebtoken');

//Db connection

//Replace ES6 with Bluebird
var promise = require('bluebird');
var config = require('../config/config.js');



//Use acpromiselib for db intertions
var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

//Connection

var connectionString = 'postgres://usuario:password@localhost:5432/agenda';
var db = pgp(connectionString);


var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {
    var credentials = req.body;
    console.log(credentials);
    db.one('select usuario from usuarios where usuario = ${usuario} and password = ${password}', credentials)
        .then(function (data) {

            var token = jwt.sign({"user": "admin"}, "secret", {
                expiresIn: "1h" });

            res.status(200)
                .json({
                    status: 'success',
                    message: 'Correct credentials! Save your token!!',
                    token: token
                });
        })
        .catch(function (err) {
            res.status(200)
                .json({
                    status: 'failure',
                    data: "Error",
                    message: 'WRONG USER OR PASSWORD'
                });
            console.log(err);
        });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
    console.log('entramos al midleware')

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "secret", function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

apiRoutes.post('/validate/:id', function(req, res) {

    var id = parseInt(req.params.id);
    db.none('update agendacultural set publicar = \'S\' where id = $1'
        , id).then(function (data) {
        res.status(200)
            .json({
                status: 'success',
                message: 'Updated event'
            });
    })
        .catch(function (err) {
            return next(err);
        });

});

module.exports = apiRoutes;
