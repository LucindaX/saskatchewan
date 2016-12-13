var express = require('express'),
    router = express.Router(),
    config = require('../config');

var async = require('async'),
    _ = require('underscore'),
		pwd = require('pwd');

var User = require('../models/User');
var Conversation = require('../models/Conversation');

/**
	* GET /signedIn
	* check if user is logged in
**/
router.get('/signedIn', function(req, res, next){
	res.send({id: req.session.user});
});

router.get('/logout', function(req, res, next){
	req.session.user = null;
	res.redirect("/");
});

/** 
	* POST /register
	* register new user
**/
router.post('/register', function(req, res, next){
	var username = req.body.username.toLowerCase();
	var password = req.body.password;
	var password_confirmation = req.body.password_confirmation;
	var email = req.body.email;
	
	if(password !== password_confirmation){
		res.status(401).send({message: "passwords do not match"});
		return;
	}
	
	User.find({ $or: [{ username: username }, { email: email }]}).limit(1)
	.exec(function(err, users){
		if(err) return next(err);
		if(users.length > 0){
			// another user with username or email exists
			let user = users[0];
			let msg = '';
			if(user.username == username) msg = 'Display name already taken !';
			else if (user.email == email) msg = 'Email already registered !';
			res.status(401).send({message: msg});
		}else{
			// good to go .. register new user
			// generate new salt and hash
			let user = {};
			pwd.hash(password, function(err, salt, hash){
				if(err) return next(err);
				user.username = username;
				user.email = email;
				user.salt = salt;
				user.passwordHash = hash;
				User.create(user, function(err, user){
					if(err) return next(err);
					req.session.user = user.id;
					res.send({ id: user.id });
				});
			});
		}
	});
});
/**
	* POST /signin
	* signin user
**/
router.post('/signin', function(req, res, next){
	var username_email = req.body.username;
	var password = req.body.password;
	User.find({ $or: [ {email: username_email}, {username: username_email} ] }).limit(1).exec(function(err, users){
		if(err) return next(err);
		console.log(users);
		if( users.length > 0 ){
			var user = users[0];
			pwd.hash(password, user.salt, function(err, hash){
				if(user.passwordHash === hash) {
					req.session.user = user.id;
					console.log(req.session.user);
					res.send({ id: user.id });
				}
				else res.status(401).send({message: 'Incorrect (username/email) or (password)'});
			});
		}
		else res.status(401).send({ message: 'Incorrect (username/email) or (password)'});
	});
});

module.exports = router;
