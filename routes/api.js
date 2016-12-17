var express = require('express'),
    router = express.Router(),
    config = require('../config');

var async = require('async'),
    _ = require('underscore'),
		pwd = require('pwd');

var User = require('../models/User');
var Conversation = require('../models/Conversation');
var crypto = require('crypto');

function generateId(id1, id2){
	if( id1 > id2 ) 
		return crypto.createHash('md5').update(id1).update(id2).digest('hex');
	else
		return crypto.createHash('md5').update(id2).update(id1).digest('hex');
};

var returnRouter = function(io){

	/**
		* GET /api/users
		* Return all users
	**/
	router.get('/users', function(req, res, next){
		User.find({_id: { $nin: req.session.user._id}},{username: 1, online: 1, id: 1}).sort({online: -1, username: 1}).exec(function(err, users){
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
		var my_id = req.session.user._id;
		Conversation.find({ _id: generateId(user_id, my_id) }, { conversation: 1 }).limit(1).exec(function(err, conversation){
			if(err) return next(err);
			if(conversation.length > 0)	return res.send(conversation[0].conversation);
			else return res.send([]);
		});
	});

	/**
		*	POST /api/conversation/:id
		* Save new message to conversation with user(:id)
	**/
	router.post('/conversation/:id', function(req, res, next){
	
		var message = req.body.message;
		var user_id = req.params.id;
		var my_id = req.session.user._id;

		var object = { message: message, user: my_id, date: new Date() };

		Conversation.findOneAndUpdate({ _id: generateId(user_id, my_id) }, { $push: { conversation: object} }, { upsert: true, new: true }).exec(function(err, conversation){
				if(err) return next(err);
				if(conversation) {
					var obj = conversation.conversation.pop();
					io.sockets.in(user_id).emit('message', obj);
					return res.send(obj);
				}
				else return res.status(401).send({message: "Could not retrieve conversation"});
			});
	});
	
	return router;
}
module.exports = returnRouter;
