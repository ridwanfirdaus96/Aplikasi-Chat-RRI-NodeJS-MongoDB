 const express = require('express'); 
 const bodyParser = require('body-parser');
 const ejs = require('ejs');
 const http = require('http');
 const container = require('./container');
 const cookieParser = require('cookie-parser');
 const session = require('express-session');
 const MongoStore = require('connect-mongo')(session);
 const flash = require('connect-flash');
 const passport = require('passport');
 const mongoose = require('mongoose');
 const ExpressValidator = require('express-validator');


 container.resolve(function(users) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/heroku', {useNewUrlParser: true});

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function(){
            console.log('listening on port 3000');
        });
        ConfigureExpress(app);

                // setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExpress(app){
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(ExpressValidator());
        app.use(session({
            secret: 'thisisasecretkey',
            resave: 'true',
            proxy: true,
            saveInitialized : true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
    }
 });











