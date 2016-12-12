import alt from '../alt';
import SignInActions from '../actions/SignInActions';

class SignInStore{
	constructor(){
		this.bindActions(SignInActions);
		this.username = '';
		this.password = '';
		this.usernameHelpBlock = '';
		this.passwordHelpBlock = '';
		this.generalHelpBlock = '';
		this.usernameValidationState = '';
		this.passwordValidationState = '';
	}

	onSignInSuccess(history){
		history.pushState(null, '/chat');
	}

	onSignInFail(errorMessage){
		this.generalHelpBlock = errorMessage;
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

	onInvalidUsername(){
		this.usernameValidationState = 'has-error';
		this.usernameHelpBlock = 'Please enter valid username or email';
	}

	onInvalidPassword(){
		this.passwordValidationState = 'has-error';
		this.passwordHelpBlock = 'Please enter valid password';
	}
}

export default alt.createStore(SignInStore);
