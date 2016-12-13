import alt from '../alt';

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
			url: '/api/register',
			data: {
				username: username,
				email: email,
				password: password,
				password_confirmation: password_confirmation
			}
		}).done((data) => {
			this.actions.registerSuccess(history);
		}).fail((jqxhr) => {
			this.actions.registerFail(jqxhr.responseJSON.message);
		});
	}

}

export default alt.createActions(RegisterActions);
