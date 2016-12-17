import React from 'react';
import UserListStore from '../stores/UserListStore';
import UserListActions from '../actions/UserListActions';

class UserList extends React.Component {
	
	constructor(props){
		super(props);
		this.state = UserListStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		UserListStore.listen(this.onChange);
		UserListActions.getUsers();

		let socket = io.connect();

		socket.on('newUserStatus', (data) => {
			UserListActions.updateUserList(data);
		});
	}

	componentWillUnmount(){
		UserListStore.unlisten(this.onChange);
	}

	componentWillReceiveProps(nextProps){
		if(this.state.notifications.indexOf(nextProps.notification) == -1){
			UserListActions.addNotification(nextProps.notification);
		}
	}

	onChange(state){
		this.setState(state);
	}

  render(){
		let userList = this.state.users.map( (user, index) => {
			let notified = this.state.notifications.indexOf(user._id);
			return(
				<li key={user._id} className="left clearfix" onClick={() => this.props.openConv(user)}>
		       <span className="chat-img pull-left">
					 	<div alt="User Avatar" className={"circle "+ (user.online ? "online" : "offline")}>{user.username.charAt(0)}</div>
		       </span>
		       <div className="chat-body clearfix">
		          <div className="header_sec">
		             <strong className="primary-font">{user.username}</strong>
								 <span className={"badge pull-right "+( notified > -1 ? "" : "hidden")}>x</span>
		          </div>
		       </div>
					 
		    </li>			
			);		
		});
    return (
      <div className="col-sm-3 chat_sidebar">
         <div className="row">
				 			<div className="list-title"> User List </div>
              <div className="member_list">
                 <ul className="list-unstyled">
                    {userList}
                 </ul>
              </div>
          </div>
      </div>
    );
  }
}

export default UserList;
