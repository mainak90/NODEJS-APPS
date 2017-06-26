var app = require('express')(),
    path = require('path'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session)

app.set('views', path.join(__dirname,  'views'));
app.engine('html', require('hogan-express')); //set templating engine to render htmls out of express
app.set('view engine', 'html'); //Set template engine
app.use(express.static(path.join(__dirname, 'public'))); //Looks for static files
app.use(cookieParser());
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(session({secret : config.sessionSecret, saveUninitialized:true, resave:true}));
} else {
    app.use(session({secret : config.sessionSecret, 
                     saveUninitialized:true, 
                     resave:true,
                     store : new ConnectMongo({
                        url : config.dbUrl,
                        stringify : true
                     })
    }));
}
require('./routes/routes.js')(express,app, session);
// app.route('/').get(function(req, res, next){
//     // res.send("<h1>Hello World!</h1>");
//     res.render('index', {'Title' : 'Welcome to ChatCAT'}) //render the html now that the template engine is defined
// });

app.listen(3000, function(){
    console.log("ChatCAT working as expected on port 3000");
    console.log('Mode : '+ env)
});