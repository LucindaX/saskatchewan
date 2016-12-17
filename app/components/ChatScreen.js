import React from 'react';
import ChatScreenActions from '../actions/ChatScreenActions';
import ChatScreenStore from '../stores/ChatScreenStore';
import {Link} from 'react-router';
var dateFormat = require('dateformat');

class ChatScreen extends React.Component {
  constructor(props){
		super(props);
		this.state = ChatScreenStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		ChatScreenStore.listen(this.onChange);
	}

	componentWillUnmount(){
		ChatScreenStore.unlisten(this.onChange);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.message !== this.state.new_message){
			ChatScreenActions.addMessage(nextProps.message);
		}
		if(nextProps.user !== this.state.user){
			ChatScreenActions.getConversation(nextProps.user);
		}
	}

	onChange(state){
		this.setState(state);
	}

	handleSubmit(event){
		event.preventDefault();
		var message = this.state.message;
		if(message.trim() == "") return;
		else ChatScreenActions.sendMessage(message, this.state.user);
	}

	handleLogout(event){
		event.preventDefault();
		ChatScreenActions.logout(this.props.history);
	}


	render(){
		
		var conversation = () => {
			
			if(this.state.user && this.state.conversation.length){
				
				let messages = this.state.conversation.map( (item, index) => {
					
					let pull = "pull-left";
					let originator;

					if(item.user == this.state.user._id){
						originator = this.state.user;
						pull = "pull-right";
					}else{
						originator = this.props.me;
					}

					return(	
							<li key={index} className="left clearfix">
						    <span className={"chat-img1 "+pull}>
						    	<div alt="User Avatar" className="circle offline">
										{originator.username.charAt(0)}
									</div>
						    </span>
						    <div className={"chat-body1 clearfix "+ (pull == 'pull-right' ? 'marginRight50' : "")}>
						      <p className={pull}>{item.message}</p><div className="clearBoth"></div>
						      <div className={"chat_time "+(pull)}>{dateFormat(item.date,"h:MM TT")}</div>
						    </div>
						  </li>
					);
				});
				
				return(
					<div className="chat_area">
						<ul className="list-unstyled">
							{messages} 
						</ul>
					</div>
				);
			}
			else{
				return <div className="chat_area empty-screen">Start Chatting</div>
			}
		};

    return(
			<div className="col-sm-9 message_section">
				<div className="row">
					<div className="new_message_head">
						<div className="pull-left capitalize">{this.state.user ? this.state.user.username + " conversation" : "" }</div>
						<div className="pull-right">
						  <div className="dropdown">
						    <button className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    <i className="fa fa-cogs" aria-hidden="true"></i>  Setting
						    <span className="caret"></span>
						    </button>
						    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
						      <li><a href="#">Action</a></li>
						      <li><a href="#">Profile</a></li>
						      <li><a onClick={this.handleLogout.bind(this)}>Logout</a></li>
						    </ul>
						  </div>
						</div>
					</div>

					{conversation()}

					<div className="message_write">
						<textarea className="form-control" value={this.state.message} placeholder="type a message" onChange={ChatScreenActions.updateMessage} />
					<div className="clearfix"></div>
						<div className="chat_bottom"><a href="#" className="pull-left upload_btn"><i className="fa fa-cloud-upload" aria-hidden="true"></i>
						  Add Files</a>
						  <a href="#" className={"pull-right btn btn-success " +( !this.state.user ? "disabled" : " ")} onClick={this.handleSubmit.bind(this)}>
						  Send</a>
						</div>
					</div>
				</div>
			</div>
		
    );
  }
}

export default ChatScreen;
