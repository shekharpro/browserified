'use strict';

module.exports = {
    env: 'production',
    url: 'https://letscatchup.net/',
    linkUrl: '',
    service: "Gmail",
    user: "fasttrainofthoughts@gmail.com",
    pass: "xxxxx",
    

    bitly_user: "vinay@letscatchup.net",
    bitly_password: "Vinay123#",
    bitly_client_id: "e6fe47bd836288d747d43900ae91645714aeb359",
    bitly_client_secret: "20592b0f6332cee5470cc0129248ff508c8cf8d7",

    //amazon service for storing images
    awsKey: 'AKIAJ6RO22MVYDVT4IWQ',
    awsSecret: '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',
    awsBucket: 'letscatchup',

    // google contacts API info
    CLIENT_ID: '874336986209-r4ccq4a0d207mfqa7367mvslf24c9hcd.apps.googleusercontent.com',
    CLIENT_SECRET: 'w26C-rSBwEInSWESg_EUzgvW',
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
