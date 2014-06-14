'use strict';

module.exports = function(server) {

    // Because I like HTML5 pushstate .. this redirects everything back to our index.html
    server.all('/*', function(req, res) {
        res.sendfile('index.html', {
            root: '../dist'
        });
    });


};