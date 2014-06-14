'use strict';


var async = require('../../node_modules/async');
var config = require('../config/env/' + process.env.NODE_ENV);
var crypto = require('crypto');
var util = require('../util');
var ObjectID = require('mongoskin').ObjectID


var authTypes = ['github', 'twitter', 'facebook', 'google'],
    SALT_WORK_FACTOR = 10;

/**
 * Make salt
 *
 * @return {String}
 * @api public
 */

function makeSalt() {

    return crypto.randomBytes(16).toString('base64');
}

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */

function encryptPassword(salt, password) {
    if (!password || !salt) {
        return '';
    }
    var salt = new Buffer(salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

// modify json to encrypt received plain text password to encrypted hashed password before saving

function preSaveUser(userData) {
    setPassword(userData);
    validateEmail(userData);
    validatePassword(userData);

}


// modify json to return additional needed information before returning

function postQueryUser(userDataArr) {
    // iterate and modify each item

    if (userDataArr && (userDataArr instanceof Array)) {

        if (userDataArr.length > 0) {

            for (var i = 0; i < userDataArr.length; i++) {
                // console.log('>>>>>>>'+JSON.stringify(userDataArr));
                // console.log('objkeys'+Object.keys(userDataArr[i]));
                if ((userDataArr[i]) && ((Object.keys(userDataArr[i])).length > 0)) {
                    userDataArr[i]['userInfo'] = {
                        'name': userDataArr[i].name,
                        'role': userDataArr[i].role,
                        'provider': userDataArr[i].provider
                    };

                    // TODO :: REVISIT THIS LOGIC AFTER ITERATION 1
                    userDataArr[i]['profile'] = {
                        '_id': userDataArr[i]._id,
                        'name': userDataArr[i].name,
                        'email': userDataArr[i].email,
                        'school': userDataArr[i].school,
                        'company': userDataArr[i].company,
                        'role': userDataArr[i].role,
                        'notificationPreference': userDataArr[i]['notificationPreference'],
                        'provider': userDataArr[i].provider,
                        'userprofile': {
                            'location': userDataArr[i].userprofile.location,
                            'skills': userDataArr[i].userprofile.skills,
                            'experience': userDataArr[i].userprofile.experience,
                            'preSchool': userDataArr[i].userprofile.preSchool,
                            'imageUrl': userDataArr[i].userprofile.imageUrl,
                            'gender': userDataArr[i].userprofile.gender
                        },
                        "ipLocation": userDataArr[i].ipLocation,
                        "phone": userDataArr[i].phone

                    };
                    // }

                }
            }
        }

    };
};


/**
 * Create User logic
 */
exports.createUser = function(userData, callback) {

    // set status as inactive
    //  establishes mechanism to keep this user as inactive unless activated
    userData['status'] = 'inactive';
    userData['ak'] = util.GenerateToken(15) + "";
    preSaveUser(userData);

    config.dbc.collection('User').insert(userData, callback)
};

/**
 * Update User logic
 */
exports.updateUser = function(findUserData, userData, callback) {
    var setOptions = {
        "$set": userData
    };
    var newOptions = {
        "new": true
    };
    config.dbc.collection('User').update(findUserData, setOptions, newOptions, callback);
};

/**
 * Update User By Id logic
 */
exports.updateUserById = function(findUserId, userData, callback) {
    //setting the status as active in the userData array
    if (userData['status']) {
        userData['status'] = 'active';
    }
    // preSaveUser(userData);
    config.dbc.collection('User').updateById(findUserId, {
        "$set": userData
    }, callback);
};


/**
 * Get User logic by query
 */
exports.findUser = function(queryData, callback) {
    config.dbc.collection('User').find(queryData).toArray(function(err, res) {
        postQueryUser(res);
        callback(err, res);
    })
};

exports.findUserProfile = function(queryData, callback) {
    config.dbc.collection('User').find(queryData).toArray(function(err, res) {
        postQueryUser(res);
        callback(err, res[0].profile);
    })
};


// get list of emails and names of all active users 
exports.findSelective = function(queryJson, fieldsToQueryJson, callback) {
    config.dbc.collection('User').find(queryJson, fieldsToQueryJson).toArray(function(err, res) {
        callback(err, res);
    })
};


exports.findAndModifyUser = function(queryData, sortClause, updateData, callback) {
    config.dbc.collection('User').findAndModify(queryData, sortClause, updateData, {
        "new": true
    }, function(err, res) {
        var userArr = [];
        userArr.push(res);
        postQueryUser(userArr);
        callback(err, userArr[0]);
    })
};


// to return complete userid object by id
exports.findFullUserById = function(userId, callback) {
    config.dbc.collection('User').findById(userId, function(err, res) {
        console.log("full user" + userId);
        callback(err, res);
    });
}

// to return partial userid object by id
// hide sensitive information from response returned
exports.findUserById = function(userId, callback) {
    this.findFullUserById(userId, function(err, res) {
        var userArr = [];
        userArr.push(res);
        postQueryUser(userArr);

        //TODO::error cannot read property profile of null;
        callback(err, userArr[0].profile);
    })
};



//------------------------gets distinct school names from db---------
exports.getSchoolsName = function(req, callback) {
    config.dbc.collection('User').distinct('school', function(err, res) {
        var schoolsArray = [];
        schoolsArray.push(res);
        callback(err, schoolsArray);
    })
};

//------------------------gets distinct company names from db---------
exports.getCompanyName = function(req, callback) {
    config.dbc.collection('User').distinct('company', function(err, res) {
        var companyArray = [];
        companyArray.push(res);

        callback(err, companyArray);
    })
};

//------------------------Check email availability in db---------
exports.checkEmailId = function(emailJson, callback) {
    console.log(emailJson);
    config.dbc.collection('User').find(emailJson).toArray(function(err, matchingUserArray) {
        console.log('arraymatch' + matchingUserArray);
        callback(err, matchingUserArray);
    });
}

//encrypts password and sets it to userData's hashed password    

function setPassword(userData) {
    var salt = makeSalt();
    userData['salt'] = salt;
    //    userData['hashedPassword'] = encryptPassword(salt, userData.password);//TODO uncomment this and remove below line
    userData['hashedPassword'] = userData.hashedPassword || userData.password;
    delete userData['password'];

};


// Validate empty email

function validateEmail(userData) {
    if (authTypes.indexOf(userData.provider) !== -1) {
        return true;
    } else {
        return false;
    }
};

// Validate empty password

function validatePassword(userData) {
    if (authTypes.indexOf(userData.provider) !== -1) {
        return true;
    } else {
        return false;

    }
};
//funtion for authenticating email
exports.authenticateEmail = function(query, callback) {
    config.dbc.collection('User').find(query, function(err, res) {

        callback(err, res);
    })
};

//function for creating active users
exports.createActiveUser = function(userData, callback) {
    // set status as active
    userData['status'] = 'active';
    preSaveUser(userData);
    config.dbc.collection('User').insert(userData, callback)
};


//this function gets more than one user json and
//calls active user to create active users for jobs e2etesting
exports.createUsers = function(userDataJsonArr, callback) {
    async.map(userDataJsonArr, this.createActiveUser, function(err, results) {
        callback();
    })
};


exports.resetUsers = function(delData, callback) {
    config.dbc.collection("User").remove(delData, callback);
};


//function for authenticating password
exports.authenticatePassword = function authenticatePassword(password, hashedPassword, salt) {
    //    return encryptPassword(password, salt) === hashedPassword;//TODO uncomment this and remove below line
    return password === hashedPassword;
};


/* This function getPeople takes a school as an argument and on that basis returns array of alumnii of that
school.*/
exports.getPeople = function(userSchool, selfUserId, callback) {


    var criteria = {
        "school": userSchool,
        '_id': {
            "$ne": new ObjectID(selfUserId.toString())
        }
    };

    config.dbc.collection('User').find(criteria).toArray(function(err, res) {
        postQueryUser(res);
        callback(err, res.profile);
    });

};
