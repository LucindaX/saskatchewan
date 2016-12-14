import alt from '../alt';
import UserListActions from '../actions/UserListActions';

class UserListStore{
	constructor(){
		this.bindActions(UserListActions);
		this.users = [];
	}

	onGetUsersSuccess(data){
		this.users = data;
	}

	onGetUsersFail(message){
		toastr.error(message);
	}
}

export default alt.createStore(UserListStore);
