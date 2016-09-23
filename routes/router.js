'use strict';

const express = require('express');

const QuentinRoute = require('./quentin.route');
const TrolledRoute = require('./trolled.route');

class Router {
    constructor() {
        this.router = express.Router();
        this.quentinRoute = new QuentinRoute(this.router);
        this.trolledRoute = new TrolledRoute(this.router);
    }
}

module.exports = Router;