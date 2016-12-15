import alt from '../alt';
import Auth from '../services/Auth';

class RegisterActions {
	constructor(){
		this.generateActions(
			'updateUsername',
			'updateEmail',
			'updatePassword',
			'updatePasswordConfirmation',
			'updateTAndC',
			'invalidUsername',
			'invalidPassword',
			'invalidPasswordConfirmation',
			'invalidUsername',
			'invalidEmail'
		);
	}

	registerSuccess(history){
		this.dispatch(history);
	}

	registerFail(errorMessage){
		this.dispatch(errorMessage);
	}

	register(username, email, password, password_confirmation, history){
		$.ajax({
			type: 'POST',
			url: '/auth/register',
			data: {
				username: username,
				email: email,
				password: password,
				password_confirmation: password_confirmation
			}
		}).done((user) => {
			Auth.me = user;
			this.actions.registerSuccess(history);
		}).fail((jqxhr) => {
			this.actions.registerFail(jqxhr.responseJSON.message);
		});
	}

}

export default alt.createActions(RegisterActions);
