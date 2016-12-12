var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {type: String, required: true, index: true , lowercase: true},
	email: {type: String, required: true, index: true, lowercase: true},
	salt: {type: String, required: true},
	passwordHash: {type: String, required: true},
	status: {type: String, required: true, default: 'offline', lowercase: true}
});

module.exports = mongoose.model('User', UserSchema);
