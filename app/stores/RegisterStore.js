import alt from '../alt';
import RegisterActions from '../actions/RegisterActions';

class RegisterStore{
	constructor(){
		this.bindActions(RegisterActions);
		this.username = '';
		this.email = '';
		this.password = '';
		this.t_and_c = '';
		this.password_confirmation = '';
		this.usernameHelpBlock = '';
		this.emailHelpBlock = '';
		this.passwordHelpBlock = '';
		this.passwordConfirmationHelpBlock = '';
		this.generalHelpBlock = '';
		this.usernameValidationState = '';
		this.passwordValidationState = '';
		this.passwordConfirmationValidationState = '';
		this.emailValidationState = '';
		this.generalHelpBlockClass = 'hidden';
	}

	onRegisterSuccess(history){
		history.pushState(null, '/chat');
	}

	onRegisterFail(errorMessage){
		this.generalHelpBlock = errorMessage;
		this.generalHelpBlockClass = '';
	}

	onUpdateUsername(event){
		this.username = event.target.value;
		this.usernameValidationState = '';
		this.usernameHelpBlock = '';
	}

	onUpdatePassword(event){
		this.password = event.target.value;
		this.passwordValidationState = '';
		this.passwordHelpBlock = '';
	}

	onUpdatePasswordConfirmation(event){
		this.password_confirmation = event.target.value;
		this.passwordConfirmationValidationState = '';
		this.passwordConfirmationHelpBlock = '';
	}

	onUpdateEmail(event){
		this.email = event.target.value;
		this.emailValidationState = '';
		this.emailHelpBlock = '';
	}

	onUpdateTAndC(event){
		this.t_and_c = event.target.value;
	}

	onInvalidUsername(){
		this.usernameValidationState = 'has-error';
		this.usernameHelpBlock = 'Please enter a valid username';
	}

	onInvalidEmail(){
		this.emailValidationState = 'has-error';
		this.emailHelpBlock = 'Please enter a vaild email';
	}

	onInvalidPassword(){
		this.passwordValidationState = 'has-error';
		this.passwordHelpBlock = 'Please enter a valid password';
	}

	onInvalidPasswordConfirmation(){
		this.passwordConfirmationValidationState = 'has-error';
		this.passwordConfirmationHelpBlock = 'Passwords dont match !';
	}

}

export default alt.createStore(RegisterStore);
