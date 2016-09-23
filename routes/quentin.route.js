'use strict';

const BaseRoute = require('./base.route');

const QuentinResponse = require('../models/index').QuentinResponse;

const config = require('../config/default.json');
const errors = require('../config/errors.json');
const quentinArray = require('./data/quentin.json');

class QuentinRoute extends BaseRoute {
    constructor(auth, router) {
        super(auth, router);
        this.registerRoutes();
    }

    static getItem(text, itemArray) {
        const sanitisedText = text.toLowerCase();

        if(sanitisedText.includes('pirate')) {
            return new QuentinResponse(
                config.RESPONSE_TYPE.LOCAL,
                'Arrrrgh!!',
                'pirate_quentin.jpg'
            );
        }

        return itemArray[Math.floor(Math.random() * itemArray.length)]; // Default to random item.
    }


    registerRoutes() {
        this.router
            .route(config.ENDPOINTS.QUENTIN)
            .post((request, response, next) => {
                let item;

                if(request.body.token !== process.env.QUENTIN_SLACK_TOKEN) {
                    return next({ status: 401, error: errors.INVALID_SLACK_TOKEN });
                }

                item = QuentinRoute.getItem(request.body.text, quentinArray);

                // Update local images with the hostname.
                if(item.type === config.RESPONSE_TYPE.LOCAL) {
                    item.imageUrl = request.protocol + '://' + request.headers.host + '/images/' + item.imageUrl;
                }

                response.json({
                    response_type: 'in_channel',
                    attachments: [{ title: item.caption, image_url: item.imageUrl }]
                });
            });
    }
}

module.exports = QuentinRoute;