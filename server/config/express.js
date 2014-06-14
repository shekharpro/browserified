'use strict';

var express = require('express'),
    path = require('path'),
    livereload = require('connect-livereload'),
    config = require('./config');
    // passport = require('passport'),
    // mongoStore = require('connect-mongo')(express);

/**
 * Express configuration
 */
module.exports = function(app) {
    // app.configure('development', function() {
    //     app.use(require('connect-livereload')());

    //     // Disable caching of scripts for easier testing
    //     app.use(function noCache(req, res, next) {
    //         if (req.url.indexOf('/scripts/') === 0) {
    //             res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    //             res.header('Pragma', 'no-cache');
    //             res.header('Expires', 0);
    //         }
    //         next();
    //     });

    //     app.use(express.static(path.join(config.root, '.tmp')));
    //     app.use(express.static(path.join(config.root, 'app')));
    //     app.use(express.errorHandler());
    //     app.set('views', config.root + '/app/designed');
    // });

    // app.configure('production', function() {
    //     app.use(express.static(path.join(config.root, '.tmp')));
    //     app.use(express.static(path.join(config.root, 'app')));
    //     app.use(express.errorHandler());
    // });

    // app.configure('test', function() {
        // app.engine('html', require('ejs').renderFile);
        // app.set('views', '../../dist');
        // app.use(express.static('../../dist'));
        // // app.use(express.errorHandler());

        // // Add live reload
        // app.use(livereload({
        //     port: 5000// TODO :: FIX THIS
        // }));

        // Use our 'dist' folder as rootfolder
        // app.use(express.static('../dist'));
       

        // app.set('views', config.root + '/app/views');
        // app.set('views', config.root + '/app/views');

    // });


    // app.configure('stage', function() {
    //     app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    //     app.use(express.static(path.join(config.root, '.tmp')));
    //     app.use(express.static(path.join(config.root, 'app')));
    //     app.use(express.errorHandler());
    //     app.set('views', config.root + '/app/designed');
    // });

    // app.configure(function() {
    //     app.set('view engine', 'html');
    //     app.use(express.logger('dev'));
    //     app.use(express.bodyParser());
    //     app.use(express.methodOverride());
    //     app.use(express.cookieParser());

    //     var expressJwt = require('express-jwt');
    //     var jwt = require('jsonwebtoken');

    //     // We are going to protect /api routes with JWT
    //     app.use('/api/**/*', expressJwt({
    //         secret: "secret" // TODO :: FIXME
    //     }));

    //     app.use(express.json());
    //     app.use(express.urlencoded());

    //     //Persist sessions with mongoStore
    //     app.use(express.session({
    //         secret: 'angular-fullstack secret',
    //         store: new mongoStore({
    //             url: config.mongo.uri,
    //             collection: 'sessions'
    //         }),
    //         proxy: true, // if you do SSL outside of node.
    //         cookie: {
    //             secure: true
    //         }
    //     }));

    //     // //use passport session
    //     // app.use(passport.initialize());
    //     // app.use(passport.session());

    //     // Router needs to be last
    //     app.use(app.router);
    // });



    // Since this is the last non-error-handling
    // middleware use()d, we assume 404, as nothing else
    // responded.

    // $ curl http://localhost:3000/notfound
    // $ curl http://localhost:3000/notfound -H "Accept: application/json"
    // $ curl http://localhost:3000/notfound -H "Accept: text/plain"

        
    app.use(function(req, res, next) {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', {
                url: req.url
            });
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({
                error: 'Not found'
            });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });

    // error-handling middleware, take the same form
    // as regular middleware, however they require an
    // arity of 4, aka the signature (err, req, res, next).
    // when connect has an error, it will invoke ONLY error-handling
    // middleware.

    // If we were to next() here any remaining non-error-handling
    // middleware would then be executed, or if we next(err) to
    // continue passing the error, only error-handling middleware
    // would remain being executed, however here
    // we simply respond with an error page.

    app.use(function(err, req, res, next) {
        // we may use properties of the error object
        // here and next(err) appropriately, or if
        // we possibly recovered from the error, simply next().
        res.status(err.status || 500);
        res.render('500', {
            error: err
        });
    });

    // Routes
    app.get('/404', function(req, res, next) {
        // trigger a 404 since no other middleware
        // will match /404 after this one, and we're not
        // responding here
        next();
    });

    app.get('/403', function(req, res, next) {
        // trigger a 403 error
        var err = new Error('not allowed!');
        err.status = 403;
        next(err);
    });

    app.get('/500', function(req, res, next) {
        // trigger a generic (500) error
        console.log('generic' + res);
        next(new Error('keyboard cat!'));
    });


};