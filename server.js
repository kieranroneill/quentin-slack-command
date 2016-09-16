'use strict';

process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

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
    let quentinItem;

    if(request.body.token !== process.env.SLACK_TOKEN) {
        return response.status(401).send('Yeah...no, you\'re not allowed to access this');
    }

    quentinItem = quentinArray[Math.floor(Math.random() * quentinArray.length)]; // Get random item.

    // Update local images with the hostname.
    if(quentinItem.type === 'local') {
        quentinItem.imageUrl = request.protocol + '://' + request.headers.host + '/images/' + quentinItem.imageUrl;
    }

    response.json({
        response_type: 'in_channel',
        attachments: [{ title: quentinItem.caption, image_url: quentinItem.imageUrl }]
    });
});

app.use('/', (request, response) => {
    response.status(404).send('Misdirection!!');
});

//====================================================
// Start server and open sockets.
//====================================================

app.listen(PORT, process.env.PRIVATE_NETWORK_IP);

console.log('Environment: ' + process.env.NODE_ENV);
console.log('Quentin are running free at ' + process.env.PRIVATE_NETWORK_IP + ':' + PORT);

// Export for testing.
module.exports.app = app;