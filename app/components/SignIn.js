import React from 'react';
import {Link} from 'react-router';
import SignInActions from '../actions/SignInActions';
import SignInStore from '../stores/SignInStore';

class SignIn extends React.Component {
	
	constructor(props){
		super(props);
		this.state = SignInStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		SignInStore.listen(this.onChange);
	}
	
	componentWillUnmount(){
		SignInStore.unlisten(this.onChange);
	}

	onChange(state){
		this.setState(state);
	}

	handleSubmit(event){
		event.preventDefault();
		var username = this.state.username.trim();
		var password = this.state.password;

		if(!username){
			SignInActions.invalidUsername();
			this.refs.usernameTextField.focus();
		}
		if(!password){
			SignInActions.invalidPassword();
			this.refs.passwordTextField.focus();
		}
		if(username && password){
			SignInActions.signin(username, password, this.props.history);
		}
	}
	
	
	render(){
		return(
			<div className="container">

			<div className="row flakerow">
					<div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
					<form role="form" onSubmit={this.handleSubmit.bind(this)}>
						<fieldset>
							<h2>Please Sign In</h2>
							<hr className="colorgraph"/>
							<div className="general-help-block">{this.state.generalHelpBlock}</div>
							<div className={"form-group " + this.state.usernameValidationState} >
						              <input type="text" name="username" ref="usernameTextField" id="username" className="form-control input-lg" placeholder="Email or Username" value={this.state.username} onChange={SignInActions.updateUsername} autoFocus/>
													<span className='help-block'>{this.state.usernameHelpBlock}</span>
							</div>
							<div className={"form-group "+this.state.passwordValidationState}>
						              <input type="password" name="password" id="password" ref="passwordTextField" value={this.state.password} onChange={SignInActions.updatePassword} className="form-control input-lg" placeholder="Password" autoFocus/>
													<span className='help-block'>{this.state.passwordHelpBlock}</span>
							</div>
							<div className="checkbox">
						              <label><input type="checkbox" name="remember_me" id="remember_me" value={this.state.remember_me} onChange={SignInActions.updateRememberMe} value="1" /> Remember Me</label>
								<a href="" className="btn btn-link pull-right">Forgot Password?</a>
							</div>
							<hr className="colorgraph"/>
							<div className="row">
								<div className="col-xs-6 col-sm-6 col-md-6">
						                  <input type="submit" className="btn btn-lg btn-success btn-block" value="Sign In"/>
								</div>
								<div className="col-xs-6 col-sm-6 col-md-6">
									<Link to="/register" className="btn btn-lg btn-primary btn-block">Register</Link>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>

			</div>
		);
	}
}

export default SignIn;
