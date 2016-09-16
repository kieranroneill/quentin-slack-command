'use strict';

process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const Errors = require('./config/errors.json');

const PORT = 1337;

const app = express();
const isDevelopment = (process.env.NODE_ENV === 'development');

const quentinArray = require('./data/quentin.json');

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

app.post('/quentin', (request, response, next) => {
    let item;

    if(request.body.token !== process.env.SLACK_TOKEN) {
        return response
            .status(401)
            .send(Errors.INVALID_SLACK_TOKEN);
    }

    item = quentinArray[Math.floor(Math.random() * quentinArray.length)]; // Get random item.

    // Update local images with the hostname.
    if(item.type === 'local') {
        item.imageUrl = request.protocol + '://' + request.headers.host + '/images/' + item.imageUrl;
    }

    response.json({
        response_type: 'in_channel',
        attachments: [{ title: item.caption, image_url: item.imageUrl }]
    });
});

app.use('/', (request, response) => {
    response.status(404).send(Errors.UNKNOWN_ROUTE);
});

//====================================================
// Start server and open sockets.
//====================================================

app.listen(PORT, process.env.PRIVATE_NETWORK_IP);

console.log('Environment: ' + process.env.NODE_ENV);
console.log('Quentin are running free at ' + process.env.PRIVATE_NETWORK_IP + ':' + PORT);

// Export for testing.
module.exports.app = app;