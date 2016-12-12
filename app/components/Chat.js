import React from 'react';
import UserList from './UserList';
import ChatScreen from './ChatScreen';

class Chat extends React.Component {
    render(){
        return (
            <div className="main_section">
               <div className="container">
                  <div className="chat_container">
                    <UserList/>
                    <ChatScreen/>
                  </div>
               </div>
            </div>
        );
    }
}

export default Chat;
