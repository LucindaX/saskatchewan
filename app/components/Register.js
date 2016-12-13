import React from 'react';
import {Link} from 'react-router';
import RegisterActions from '../actions/RegisterActions';
import RegisterStore from '../stores/RegisterStore';

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = RegisterStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	
	componentDidMount(){
		RegisterStore.listen(this.onChange);
	}

	componentWillUnmount(){
		RegisterStore.unlisten(this.onChange);
	}

	onChange(state){
		this.setState(state);
	}

	handleSubmit(event){
		event.preventDefault();
		var username = this.state.username.trim();
		var email = this.state.email.trim();
		var password = this.state.password;
		var password_confirmation = this.state.password_confirmation;
		var t_and_c = this.state.t_and_c;

		if(!username){
			RegisterActions.invalidUsername();
			this.refs.usernameTextField.focus();
		}
		if(!password){
			RegisterActions.invalidPassword();
			this.refs.passwordTextField.focus();
		}
		if(password_confirmation !== password){
			RegisterActions.invalidPasswordConfirmation();
			this.refs.passwordConfirmationTextField.focus();
		}
		if(!email){
			RegisterActions.invalidEmail();
			this.refs.emailTextField.focus();
		}
		if(!t_and_c){
			return;
		}
		if(username && email && password && password_confirmation && (password == password_confirmation)){
			RegisterActions.register(username, email, password, password_confirmation, this.props.history);
		}
	}
	
	render(){
		return(
			<div className="container">

				<div className="row">
						<div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
						<form role="form" onSubmit={this.handleSubmit.bind(this)}>
							<h2>Please Sign Up <small>Its free and always will be.</small></h2>
							<div className={"alert bs-callout bs-callout-danger alert-dismissible " + this.state.generalHelpBlockClass} role="alert">
								<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">x</span></button>
								<h5>{this.state.generalHelpBlock}</h5>
							</div>
							<hr className="colorgraph"/>
	
							<div className={"form-group "+ this.state.usernameValidationState} >
								<input type="text" name="username" id="username" className="form-control input-lg" value={this.state.username} onChange={RegisterActions.updateUsername} placeholder="Display Name" ref="usernameTextField" tabIndex="3"/>
								<span className='help-block'>{this.state.usernameHelpBlock}</span>
							</div>
							<div className={"form-group " + this.state.emailValidationState} >
								<input type="email" name="email" id="email" className="form-control input-lg" value={this.state.email} onChange={RegisterActions.updateEmail} placeholder="Email Address" ref="emailTextField" tabIndex="4"/>
								<span className='help-block'>{this.state.emailHelpBlock}</span>
							</div>
							<div className="row">
								<div className="col-xs-12 col-sm-6 col-md-6">
									<div className={"form-group " + this.state.passwordValidationState} >
										<input type="password" name="password" id="password" className="form-control input-lg" value={this.state.password} onChange={RegisterActions.updatePassword}  placeholder="Password" ref="passwordTextField" tabIndex="5"/>
										<span className='help-block'>{this.state.passwordHelpBlock}</span>
									</div>
								</div>
								<div className="col-xs-12 col-sm-6 col-md-6">
									<div className={"form-group " + this.state.passwordConfirmationValidationState} >
										<input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-lg" value={this.state.password_confirmation} onChange={RegisterActions.updatePasswordConfirmation} placeholder="Confirm Password" ref="passwordConfirmationTextField" tabIndex="6"/>
										<span className='help-block'>{this.state.passwordConfirmationHelpBlock}</span>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-4 col-sm-3 col-md-3">
									<div className="checkbox">
										<label><input type="checkbox" name="t_and_c" id="t_and_c" value={this.state.t_and_c} onChange={RegisterActions.updateTAndC} value="1"/> I Agree</label>
									</div>
								</div>
								<div className="col-xs-8 col-sm-9 col-md-9">
									 By clicking <strong className="label label-primary">Register</strong>, you agree to the <a href="#" data-toggle="modal" data-target="#t_and_c_m">Terms and Conditions</a> set out by this site, including our Cookie Use.
								</div>
							</div>
			
							<hr className="colorgraph"/>
							<div className="row">
								<div className="col-xs-12 col-md-6"><input type="submit" value="Register" className="btn btn-primary btn-block btn-lg" tabIndex="7"/></div>
								<div className="col-xs-12 col-md-6"><Link to="/" className="btn btn-success btn-block btn-lg">Sign In</Link></div>
							</div>
						</form>
					</div>
				</div>

				<div className="modal fade" id="t_and_c_m" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 className="modal-title" id="myModalLabel">Terms & Conditions</h4>
							</div>
							<div className="modal-body">
								<p>Do you agree boy ?</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">I Agree</button>
							</div>
						</div>
					</div>
				</div>
				</div>		
		);
	}

}

export default Register;
