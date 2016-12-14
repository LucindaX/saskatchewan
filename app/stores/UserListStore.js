import alt from '../alt';
import UserListActions from '../actions/UserListActions';
var _ = require('underscore');

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

	onUpdateUserList(data){
		console.log("Socket data");
		console.log(data);
		let index = _.indexOf(this.users, _.find(this.users, {_id: data._id}));
		this.users.splice(index, 1, data);
		this.users = this.users.sort(function(a,b){
			if( a.online && !b.online ) return -1;
			else if( !a.online && b.online ) return 1;
			else return a.username > b.username ;
		});
	}
}

export default alt.createStore(UserListStore);
