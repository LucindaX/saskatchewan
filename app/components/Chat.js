import React from 'react';
import UserList from './UserList';
import ChatScreen from './ChatScreen';
import Auth from '../services/Auth';

class Chat extends React.Component {
    constructor(props){
			super(props);
			this.state = { user: null, notification: null, message: null };
			this.onChange = this.onChange.bind(this);
			this.openConv = this.openConv.bind(this);
		}

		componentDidMount(){
			let socket = io.connect();
			socket.on('message', (obj) => {
				if(this.state.user && (obj.user == this.state.user._id)){
					// screen already open
					// add to conversation
					this.setState({ message: obj });
				}else{
					// add notification on userList
					this.setState({ notification: obj.user });
				}
			});
		}
		
		openConv(user, index){
			if(index > -1){
				this.setState({notification: { index: index} })
			}
			this.setState({ user: user });
		}
		
		onChange(state){
			this.setState(state);
		}

		render(){
        return (
            <div className="main_section">
               <div className="container">
                  <div className="chat_container">
                    <UserList openConv = {this.openConv} notification={this.state.notification}/>
                    <ChatScreen user={this.state.user} me={Auth.get()} message={this.state.message} history={this.props.history} />
                  </div>
               </div>
            </div>
        );
    }
}

export default Chat;
