/*
 * https://github.com/5orenso
 *
 * Copyright (c) 2014 Øistein Sørensen
 * Licensed under the MIT license.
 */
'use strict';

var _ = require('underscore'),
    express = require('express'),
    bodyParser = require('body-parser'),
    commander = require('commander'),
    appPath = __dirname + '/../',
    logger = require(appPath + 'lib/logger')({
        workerId: 1 //cluster.worker.id
    }),
    localUtil = require(appPath + 'lib/local-util')();

var app = express();

commander
    .option('-c, --config <file>', 'configuration file path', './config/config.js')
    .parse(process.argv);
var config = require(commander.config);
if (config) {
    if (_.isObject(config) && _.isObject(config.log)) {
        logger.set('log', config.log);
    }
}

app.use(bodyParser.json());

// Include route handlers ------------------------
var rssRouter = require('./routes/rss');
rssRouter.setConfig(config, {
    workerId: 1 //cluster.worker.id,
});
var apiRouter = require('./routes/api');
apiRouter.setConfig(config, {
    workerId: 1 //cluster.worker.id,
});
var webRouter = require('./routes/web');
webRouter.setConfig(config, {
    workerId: 1 //cluster.worker.id,
});
var imageRouter = require('./routes/image');
imageRouter.setConfig(config, {
    workerId: 1, //cluster.worker.id,
    photoPath: config.adapter.markdown.photoPath,
    photoCachePath: config.blog.domain
});
var searchRouter = require('./routes/search');
searchRouter.setConfig(config, {
    workerId: 1 //cluster.worker.id,
});

// Register routes -------------------------------
app.use('/api', apiRouter);
app.use('/rss', rssRouter);
app.use('/static', localUtil.setCacheHeaders);
app.use('/static', express.static(config.blog.staticFilesPath));
app.use('/.well-known/', express.static(config.blog.textFilesPath));
app.use('/pho/', imageRouter);
app.use('/search/', searchRouter);
app.use('/', webRouter);

// Start the server ------------------------------
var server = app.listen(config.app.port, function () {
        var host = server.address().address;
        var port = server.address().port;
        logger.log('info', 'Something happens at http://' + host + ':' + port + '/');
    });
