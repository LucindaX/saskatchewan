import React from 'react';

class ChatScreen extends React.Component {
  constructor(props){
		super(props);
		//this.state = ChatScreenStore.getState();
		this.state = { user: null };
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		//ChatScreenStore.listen(this.onChange);
	}

	componentWillUnmount(){
		//ChatScreenStore.unlisten(this.onChange);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.user !== this.state.user){
			this.setState({ user: nextProps.user });
		}
		console.log(nextProps.user);
	}

	onChange(state){
		this.setState(state);
	}

	handleSubmit(event){

	}


	render(){
		
		var disable = true;
		var screen = () => {
			
			if(this.state.user){
				
				disable = false;
				
				return(
					<div className="chat_area">
						<ul className="list-unstyled">
						  <li className="left clearfix">
						    <span className="chat-img1 pull-left">
						    <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" className="img-circle"/>
						    </span>
						    <div className="chat-body1 clearfix">
						      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
						      <div className="chat_time pull-right">09:40PM</div>
						    </div>
						  </li>
						  
						  <li className="left clearfix admin_chat">
						    <span className="chat-img1 pull-right">
						    <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" className="img-circle"/>
						    </span>
						    <div className="chat-body1 clearfix">
						      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
						      <div className="chat_time pull-left">09:40PM</div>
						    </div>
						  </li>
						  
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
						<div className="pull-left capitalize">{this.state.user ? this.state.user.username + " conversation" : this.props.me.username + " conversations"}</div>
						<div className="pull-right">
						  <div className="dropdown">
						    <button className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    <i className="fa fa-cogs" aria-hidden="true"></i>  Setting
						    <span className="caret"></span>
						    </button>
						    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
						      <li><a href="#">Action</a></li>
						      <li><a href="#">Profile</a></li>
						      <li><a href="#">Logout</a></li>
						    </ul>
						  </div>
						</div>
					</div>

					{screen()}

					<div className="message_write">
						<textarea className="form-control" placeholder="type a message"></textarea>
						<div className="clearfix"></div>
						<div className="chat_bottom"><a href="#" className="pull-left upload_btn"><i className="fa fa-cloud-upload" aria-hidden="true"></i>
						  Add Files</a>
						  <a href="#" className={"pull-right btn btn-success " +( disable ? "disabled" : " ")}>
						  Send</a>
						</div>
					</div>
				</div>
			</div>
		
    );
  }
}

export default ChatScreen;
