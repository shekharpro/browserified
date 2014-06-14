'use strict';

module.exports = {
    env: 'development',
    url: 'http://localhost:3000/',
    linkUrl: '',
    service: "Gmail",
    user: "fasttrainofthoughts@gmail.com",
    pass: "laddoobaar",

    bitly_user: "saurshaz",
    bitly_password: "testtest",
    bitly_client_id: "f7d3f333caef383c716953f024d84989eb459a73",
    bitly_client_secret: "0fc3d08741d466ac424fdde6eceac43fc502c4da",

    
   //amazon service for storing images
    // awsKey: 'AKIAJ6RO22MVYDVT4IWQ',
    // awsSecret: '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',
    // awsBucket: 'letscatchup',

    ///---- ToDo remove this and make above work
    awsKey: 'AKIAI4CO5PWKQB4B5VEQ',
    awsSecret: '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',
    awsBucket: 'elasticbeanstalk-ap-southeast-1-089818418882',

    // google contacts API info
    CLIENT_ID: '874336986209-avvstqdf7g7t8tmm7g9hfjhe9bshgrpn.apps.googleusercontent.com',
    CLIENT_SECRET: 'YZfuSVl2D6N_Dx-chR6bP-3m',
    // google gmail credentials

    mongo: {
        uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/userdb'
    },
    TABLE: "",
    // Connect to database
    dbc: require('mongoskin').db(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/userdb', {
        safe: true
    })
};
