'use strict';

var async = require('../../node_modules/async');
var config = require('../config/env/' + process.env.NODE_ENV);
var crypto = require('crypto');
var util = require('../util');
var userDao = require('./userDao');
var ObjectID = require('mongoskin').ObjectID;




/**
 * This function is passed the school and gets the school's alumnii's company.
 */


exports.getAlumni = function(school, selfUserId, callback) {
    console.log('>>> companies for the alumni of ' + school + ' college are ');
    var criteria = {
        "school": school,
        "company": {
            "$ne": ""
        },
        '_id': {
            "$ne": new ObjectID(selfUserId.toString())
        }
    }

    // db.User.distinct('userprofile.experience.company',{'school.name':'ims','userprofile.experience.company': {'$in':['hcl','catchup']}})


    config.dbc.collection('User').distinct('company', criteria, function(err, res) {
        console.log(JSON.stringify(res));
        var alumniCompanyList = [];
        alumniCompanyList.push(res);
        callback(err, alumniCompanyList);
    })
};


// exports.getAlumniCount = function(companyInArr, callback) {
//     config.dbc.collection('User').aggregate({
//             $match: {
//                 "company": {
//                     "$in": companyInArr
//                 }
//             },
//             $group: {
//                 _id: "$company",
//                 company: {
//                     $sum: 1
//                 }
//             }
//         },
//         function(err, res) {
//             var alumniCompanyList = [];
//             alumniCompanyList.push(res);
//             callback(err, alumniCompanyList);
//         });

// };




// // /**
// // ToDo:: fix Me, currently returning all the companies of all user
// // */
// exports.getAlumniCount = function (school, companyInArr, callback) {
//     config.dbc.collection('User').aggregate({
//             $group: {
//                 _id: "$company",
//                 company: {
//                     $push: "$company"
//                 }
//             }
//         }, {
//             $match: {
//                 "company": {
//                     "$in": companyInArr
//                 }
//             }
//         },
//         function (err, res) {
//             var alumniCompanyList = [];
//             alumniCompanyList.push(res);
//             callback(err, alumniCompanyList);
//         });

// };



// /**
// ToDo:: fix Me, currently returning all the companies of all user
// */
exports.getAlumniCount = function(school, companyInArr, selfUserId, callback) {
    console.log('school ' + school);
    var idString = new ObjectID(selfUserId);
    var idArr = [];
    idArr.push(idString);

    console.log('ObjectID------------- ' + idArr);
    config.dbc.collection('User').aggregate([{
            "$match": {
                "company": {
                    "$in": companyInArr
                }
            }
        }, {
            "$match": {
                "_id": {
                    "$nin": idArr
                }
            }
        }, {
            "$match": {
                "school": school
            }
        }, {
            "$group": {
                "_id": "$company",
                "count": {
                    "$sum": 1
                }
            }
        }],

        function(err, res) {
            console.log("response ffrom job dao==========" + res);
            callback(err, res);
        });

};

// // /**
// // ToDo:: fix Me, currently returning all the companies of all user
// // */
// exports.getAlumniCount = function (school, companyInArr, callback) {
//     console.log('school ' + school);
//     config.dbc.collection('User').aggregate({
//             "$group": {
//                 "_id": "$company",
//                 "count": {
//                     "$sum": {
//                         "$cond": [{
//                                 "$and": [{
//                                     "$eq": ["$school", "kv"]
//                                     // "$eq": ["$school", school]
//                                 },{
//                                     "$eq": ["$company",{"$in": ["microsoft","prokriya"]}]
//                                     // "$eq": ["$school", school]
//                                 }]
//                             },
//                             1, 0
//                         ]
//                     }
//                 }
//             }
//         },
//         function (err, res) {
//             callback(err, res);
//         });

// };



// /**
// ToDo:: fix Me, currently returning all the companies of all user
// */
// exports.getAlumniCount = function(companyIn, callback) {
//     config.dbc.collection('User').aggregate({
//             // $match: {
//             //     company: companyIn
//             // },
//             $group: {
//                 _id: "$company",
//                 company: {
//                     $push: "$company"
//                 }
//             }
//         },
//         function(err, res) {
//             var alumniCompanyList = [];
//             alumniCompanyList.push(res);
//             callback(err, alumniCompanyList);
//         });

// };
