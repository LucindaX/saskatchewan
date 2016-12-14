import alt from '../alt';

class UserListActions{
	getUsersSuccess(payload){
		this.dispatch(payload);
	}

	getUsersFail(payload){
		this.dispatch(payload);
	}

	getUsers(){
		$.ajax({url: '/api/users'})
			.done( (data) => {
				this.actions.getUsersSuccess(data);
			})
			.fail( (jqxhr) => {
				this.actions.getUsersFail(jqxhr.responseJSON.message);
			});
	}
}

export default alt.createActions(UserListActions);
