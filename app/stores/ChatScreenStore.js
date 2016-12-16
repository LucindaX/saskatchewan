import alt from '../alt'
import ChatScreenActions from '../actions/ChatScreenActions';

class ChatScreenStore {
	constructor(){
		this.bindActions(ChatScreenActions);
		this.user = null;
		this.conversation = [];
		this.message = "";
	}

	onGetConversationSuccess(data){
		this.conversation = data.conversation;
		this.user = data.user;
	}

	onGetConversationFail(msg){
		toastr.error(jqxhr.responseJSON.message);
	}

	onSendMessageSuccess(message){
		this.conversation.push(message);
		this.message = "";
	}

	onSendMessageFail(message){
		toastr.error(message);
	}

	onUpdateMessage(event){
		this.message = event.target.value;
	}

}

export default alt.createStore(ChatScreenStore);
