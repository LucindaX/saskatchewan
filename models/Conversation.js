var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConversationSchema = new mongoose.Schema({
	_id: {type: String, index: true, unique: true},
	conversation: [
		{
			user: { type: Schema.ObjectId, required: true },
			date: { type: Date, required: true },
			message: { type: String, required: true }
		}
	]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
