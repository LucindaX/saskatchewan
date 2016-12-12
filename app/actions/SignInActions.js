import alt from '../alt';

class SignInActions {
	constructor(){
		this.generateActions(
			'updateUsername',
			'updatePassword',
			'invalidUsername',
			'invalidPassword'
		);
	}

	signInSuccess(history){
		// payload should be his id or that
		// he's signed in
		this.dispatch(history);
	}

	signInFail(errorMessage){
		// payload is error
		this.dispatch(errorMessage);
	}

	signin(username, password, history){
		$.ajax({
			type: 'POST',
			url: '/api/signin',
			data: {username: username, password: password}
		}).done((data) => {
			this.actions.signInSuccess(history);
		}).fail((jqxhr) => {
			this.actions.signInFail(jqxhr.responseJSON.message);
		});
	}
}

export default alt.createActions(SignInActions);


