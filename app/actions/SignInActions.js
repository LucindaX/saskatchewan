import alt from '../alt';
import Auth from '../services/Auth';

class SignInActions {
	constructor(){
		this.generateActions(
			'updateUsername',
			'updatePassword',
			'updateRememberMe',
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
			url: '/auth/signin',
			data: {username: username, password: password}
		}).done((user) => {
			Auth.save(user);
			this.actions.signInSuccess(history);
		}).fail((jqxhr) => {
			this.actions.signInFail(jqxhr.responseJSON.message);
		});
	}
}

export default alt.createActions(SignInActions);


