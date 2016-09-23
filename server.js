'use strict';

process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const Router = require('./routes/router');

const PORT = 1337;

const app = express();

//====================================================
// Configuration.
//====================================================

dotenv.config();

//====================================================
// Middleware.
//====================================================

// Log requests to console.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(bodyParser.json());

// Serve static assets.
app.use(express.static(path.resolve(__dirname, 'public')));

//====================================================
// Routes.
//====================================================

const router = new Router(auth);

app.use('/', router.router);

//====================================================
// Error handling.
//====================================================

app.use(function(error, request, response, next) {
    if(error) {
        return response.status(error.status || 500).json({ error: error.error });
    }

    next();
});

//====================================================
// Start server and open sockets.
//====================================================

app.listen(PORT, process.env.PRIVATE_NETWORK_IP);

console.log('Environment: ' + process.env.NODE_ENV);
console.log('Quentin are running free at ' + process.env.PRIVATE_NETWORK_IP + ':' + PORT);

// Export for testing.
module.exports.app = app;