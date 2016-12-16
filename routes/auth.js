var express = require('express'),
    router = express.Router(),
    config = require('../config');

var async = require('async'),
    _ = require('underscore'),
		pwd = require('pwd');

var User = require('../models/User');
var Conversation = require('../models/Conversation');
var io = require('../lib/io');
/**
	* GET /signedIn
	* check if user is logged in
**/
router.get('/signedIn', function(req, res, next){
	res.send({id: req.session.user});
});

router.get('/logout', function(req, res, next){
	var id = req.session.user;
	User.find({_id: id}, {online: 1, username: 1}).limit(1).exec(function(err, list){
		if(err) return next(err);
		if(list.length > 0){
			let user = list[0];
			user.online = false;
			user.save(function(err, user){
				io.emit('newUserStatus', user);
				req.session.user = null;
				res.redirect("/");
			});
		}
		else return res.status(401).send();
	});
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
				user.online = true;
				User.create(user, function(err, user){
					if(err) return next(err);
					req.session.user = user;
					res.send(user);
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
		if( users.length > 0 ){
			var user = users[0];
			pwd.hash(password, user.salt, function(err, hash){
				if(user.passwordHash === hash) {
					user.online = true;
					user.save({username: 1, online: 1}, function(err, obj){
						if(err) return next(err);
						let filtered = _.pick(obj, 'username', '_id', 'online')
						req.session.user = filtered;
						io.emit('newUserStatus', filtered);
						res.send(filtered);
					});
				}
				else res.status(401).send({message: 'Incorrect (username/email) or (password)'});
			});
		}
		else res.status(401).send({ message: 'Incorrect (username/email) or (password)'});
	});
});

module.exports = router;
