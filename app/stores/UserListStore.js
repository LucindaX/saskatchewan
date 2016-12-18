import alt from '../alt';
import UserListActions from '../actions/UserListActions';
var _ = require('underscore');

class UserListStore{
	constructor(){
		this.bindActions(UserListActions);
		this.users = [];
		this.notifications = [];
	}

	onGetUsersSuccess(data){
		this.users = data;
	}

	onGetUsersFail(message){
		toastr.error(message);
	}

	onAddNotification(id){
		this.notifications.push(id);
	}

	onRemoveNotification(index){
		this.notifications.splice(index, 1);
	}

	onUpdateUserList(data){
		let index = _.indexOf(this.users, _.find(this.users, {_id: data._id}));
		this.users.splice(index, 1, data);
		this.users = this.users.sort(function(a,b){
			if( a.online && !b.online ) return -1;
			else if( !a.online && b.online ) return 1;
			else return a.username > b.username ;
		});
		if( data.online )
		toastr.info(data.username + " is online");
		else
		toastr.info(data.username + " has gone offline");
	}
}

export default alt.createStore(UserListStore);
