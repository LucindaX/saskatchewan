var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    unless = require('express-unless'),
    cookieParser = require('cookie-parser'),
		session = require('express-session');

// Babel ES6/JSX Compiler
require('babel-register');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

// For MongoDB
var mongoose = require('mongoose'),
    config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('error',function(){
    console.info('Error: Could not connect to database . Did you forget to run `mongod` ?');
});

// For socket.io
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);


app.set('port',process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
	secret: '123QUETRY',
	cookie: {httpOnly: true, maxAge: 3600000},
	resave: false,
	saveUninitialized: true
}));

app.use('/auth', require('./routes/auth'));
// using the api routes
app.use('/api', authChecker, require('./routes/api'));

// The 'next(err)' handler
app.use(errorHandler);

app.use(authReact);
// Handle React internal routes
app.use(function(req, res){
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps){
        if(err){
            res.status(500).send(err.message);
        } else if(redirectLocation){
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if(renderProps){ 
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', {html: html});
            res.status(200).send(page);
        } else{
            res.status(404).send('Page Not Found');
        }
    });
});



var onlineUsers = 0;

io.sockets.on('connection', function(socket){
    onlineUsers++;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    socket.on('disconnect', function(){
        onlineUsers--;
        io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port') );
});

function errorHandler(err, req, res, next){
    console.log(err);
    res.status(500).send({ message: err.message });
}

function authChecker(req, res, next){
	if(req.session.user) next(); 
	else res.status(401).send({ message: "You have no privilege" });
}

function authReact(req, res, next){
	console.log(req.session.user);
	if(!req.session.user){
		if(req.url == '/chat') res.redirect('/');
	}else{
		if(req.url == '/' || req.url == '/register') res.redirect('/chat');
	}
	next();
}
