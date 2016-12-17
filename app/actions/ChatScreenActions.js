import alt from '../alt';
import Auth from '../services/Auth';

class ChatScreenActions {
	
	updateMessage(payload){
		this.dispatch(payload);
	}
	
	addMessage(payload){
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

	logoutSuccess(payload){
		this.dispatch(payload);
	}

	logoutFail(payload){
		this.dispatch(payload);
	}

	logout(history){
		$.ajax({ url: '/auth/logout' })
			.done( () => {
				Auth.logout();
				this.actions.logoutSuccess(history);
			}).fail( () => {
				this.actions.logoutFail();
			});
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
