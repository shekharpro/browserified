'use strict';

module.exports = function(server) {

    // ###### ROUTES FILE CONTENTS ######
    // get mapping for /
    server.get('/', function(req, res) {
      res.sendfile('index.html', {
        root: 'dist'
      });
    });

    // call Angular service to fetch people JSON
    var peopleService = require('../app/scripts/services/PeopleService')();
    server.get('/people', function(req, res) {
      res.json(peopleService.getPeopleDetails());
    });


};
