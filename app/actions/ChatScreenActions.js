import alt from '../alt';

class ChatScreenActions {
	
	updateMessage(payload){
		this.dispatch(payload);
	}

	getConversationSuccess(payload){
		this.dispatch(payload);
	}

	getConversationFail(payload){
		this.dispatch(payload);
	}

	sendMessageSuccess(payload){
		this.dispatch(payload);
	}

	sendMessageFail(payload){
		this.dispatch(payload);
	}

	getConversation(user){
		$.ajax({
			url: '/api/conversation/'+user._id
		}).done( (data) => {
			this.actions.getConversationSuccess({conversation: data, user: user});
		}).fail( (jqxhr) => {
			this.actions.getConversationFail(jqxhr.responseJSON.message);
		});
	}

	sendMessage(message, user){
		$.ajax({
			method: 'POST',
			url: '/api/conversation/'+user._id ,
			data: { message: message }
		}).done( (data) => {
			this.actions.sendMessageSuccess(data);
		}).fail( (jqxhr) => {
			this.actions.sendMessageFail(jqxhr.responseJSON.message);
		});
	}

}

export default alt.createActions(ChatScreenActions);
