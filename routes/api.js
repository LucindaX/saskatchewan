var express = require('express'),
    router = express.Router(),
    config = require('../config');

var async = require('async'),
    _ = require('underscore'),
		pwd = require('pwd');

var User = require('../models/User');
var Conversation = require('../models/Conversation');



/**
	* GET /api/users
	* Return all users
**/
router.get('/users', function(req, res, next){
	User.find({},{username: 1, online: 1, id: 1}).sort({online: -1, username: 1}).exec(function(err, users){
		if(err) return next(err);
		res.send(users);
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
