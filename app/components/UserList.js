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
	}

	componentWillUnmount(){
		UserListStore.unlisten(this.onChange);
	}

	onChange(state){
		this.setState(state);
	}

  render(){
		let userList = this.state.users.map( (user, index) => {
			return(
				<li className="left clearfix">
		       <span className="chat-img pull-left">
					 	<div alt="User Avatar" className={"circle "+ (user.online ? "online" : "offline")}>{user.username.charAt(0)}</div>
		       </span>
		       <div className="chat-body clearfix">
		          <div className="header_sec">
		             <strong className="primary-font">{user.username}</strong>
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
