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
	res.send({id: req.session.id});
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
				if(user.passwordHash === hash) res.send({ id: user.id });
				else res.status(401).send({message: 'Incorrect (username/email) or (password)'});
			});
		}
		else res.status(401).send({ message: 'Incorrect (username/email) or (password)'});
	});
});

/**
	* GET /api/users
	* Return all users
**/
router.get('/users', function(req, res, next){
	User.find({},{username: 1, status: 1, id: 1}).exec(function(err, users){
		if(err) return next(err);
		res.send({users: users});
	})
});

/**
	* GET /api/conversation/:id
	* Return conversation with user(:id)
**/
router.get('/conversation/:id', function(req, res, next){
	var user_id = req.params.id;
	var my_id = req.session.my_id;
	Conversation.find({ users: [my_id, user_id] }, { conversation: 1 }).exec(function(err, conversation){
		if(err) return next(err);
		res.send({conversation: conversation});
	});
});

module.exports = router
