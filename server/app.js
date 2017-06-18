/**
 * Created by neeraj on 6/17/17.
 */

// The express imports for HTTP handling.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const _ = require('lodash');

const sys_config = require('./config/system.config');
const {_404, _500} = require('./infra/system.error');

// use the configured port, and if not found use 3000.
const port = sys_config.port || 3000;

// the base for the HTTP calls.
const base = "/api";
const promo_images = require('./domain/promos/images.route');
const published_routes = {
    [promo_images.base]: promo_images.routes
};

/**
 * Configure the application.
 * Use JSON. This establishes json as the exchange protocol.
 * Use express. Use the router for the base.
 */
function configure() {
    app.use(bodyParser.json());
    app.use(base, router);
}

/**
 * Publish the routes that are published in the published_routes.
 * @param router
 */
function publish_routes(router) {
    console.log("starting routes ...");
    _.forOwn(published_routes, (publish, name) => {
        console.log(`\t . ${name}`);
        publish(router);
    });
}

function add_default_handlers() {
    // default error handler. If it reaches here, we haven't handled errors.
    app.use((err, req, res, next) => {
        if (!res.headersSent) {
            if (_.isEmpty(err)) {
                err = _500;
            }

            res.status(500)
                .send(err);
        }
    });

    // default, endpoint not found.
    app.use(function (req, res, next) {
        res.status(404)
            .send(_404);
    });
}

/**
 * Start the server on the port.
 */
function listen() {
    app.listen(port, () => {
        console.log(`PSM : Promo Server started at port :: ${port}`);
    })
}

/**
 * boot the application.
 * @type {{boot: (())}}
 */
exports = module.exports = {
    boot: () => {
        configure();
        publish_routes(router);
        add_default_handlers();
        listen();
    }
};