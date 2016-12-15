import React from 'react';
import UserList from './UserList';
import ChatScreen from './ChatScreen';
import Auth from '../services/Auth';

class Chat extends React.Component {
    constructor(props){
			super(props);
			this.state = { user: null };
			this.onChange = this.onChange.bind(this);
			this.openConv = this.openConv.bind(this);
		}
		
		openConv(user){
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
                    <UserList openConv = {this.openConv}/>
                    <ChatScreen user={this.state.user} me={Auth.me} />
                  </div>
               </div>
            </div>
        );
    }
}

export default Chat;
