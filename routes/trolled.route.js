'use strict';

const BaseRoute = require('./base.route');

const config = require('../config/default.json');
const errors = require('../config/errors.json');
const trollArray = require('./data/quentin.json');

class TrolledRoute extends BaseRoute {
    constructor(auth, router) {
        super(auth, router);
        this.registerRoutes();
    }


    registerRoutes() {
        this.router
            .route(config.ENDPOINTS.TROLLED)
            .post((request, response, next) => {
                let item;

                if(request.body.token !== process.env.TROLLED_SLACK_TOKEN) {
                    return next({ status: 401, error: errors.INVALID_SLACK_TOKEN });
                }

                response.json({
                    response_type: 'in_channel',
                    attachments: [{ title: item.caption, image_url: item.imageUrl }]
                });
            });
    }
}

module.exports = QuentinRoute;