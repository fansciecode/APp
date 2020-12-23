const express = require('express');
const logger = require('morgan');
const Events = require('./routes/Events');
const Query =require('./routes/query');
const users = require('./routes/users');
const locationroute =require('./routes/location');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
const geolib = require('geolib');
var firebase = require('firebase');


var config = {
    apiKey: "AIzaSyCQYqP_C7HugR6WivrHnzMiOmZDOb_P8gc",
    authDomain: "ibcm-api.firebaseapp.com",
    databaseURL: "https://ibcm-api-default-rtdb.firebaseio.com",
    projectId: "ibcm-api",
    storageBucket: "ibcm-api.appspot.com",
    messagingSenderId: "713152971783",
    appId: "1:713152971783:web:0988297e42dba5a23a96a2"
  };
  firebase.initializeApp(config);
//   firebase.analytics();


app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())
app.get('/', function (req, res) {
    // firebase.database().ref('/demomessages').set({TestMessage: 'Welcome to IBC'});
    res.json({
        "Welcome": "Welcome to iBC"
    });
});
// public route

app.use('/users', users);
// private route
app.use('/events', Events);
app.use('/query',validateUser ,Query);
app.use('/location',locationroute);
// app.use('/query/location',Query)
app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });

}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({
            message: "Not found"
        });
    else
        res.status(500).json({
            message: "Something looks wrong :( !!!"
        });
});
app.listen(3000, function () {
    console.log('Node server listening on port 3000');
});
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
  
