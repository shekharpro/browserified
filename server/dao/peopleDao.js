'use strict';

var async = require('../../node_modules/async');
var config = require('../config/env/' + process.env.NODE_ENV);
var crypto = require('crypto');
var util = require('../util');
var userDao = require('./userDao');
var ObjectID = require('mongoskin').ObjectID;


//this function gives the people list whose names are similar or starts from query name
//works exactly like sql Like statement
exports.searchPeopleInDb = function(peopleName, callback) {
    config.dbc.collection('User').find(peopleName).toArray(function(err, res) {
        callback(err, res);
    })

};

