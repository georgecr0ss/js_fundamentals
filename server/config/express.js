const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = (app, config) => {
    console.warn(config);
    app.set('view engine', 'ejs');
    app.set('views', config.rootPath + 'server/views');

    app.use(cookieParser());
    app.use(session({
        secret: 'js_apps_66',
        resave: true,
        saveUninitialized: true
    }));
    app.use(express.static(config.rootPath + 'public'));

    console.log('Express ready');
}
