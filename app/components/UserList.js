import React from 'react';

class UserList extends React.Component {
  render(){
    return (
      <div className="col-sm-3 chat_sidebar">
         <div className="row">
              <div className="member_list">
                 <ul className="list-unstyled">
                    <li className="left clearfix">
                       <span className="chat-img pull-left">
                       <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" className="img-circle"/>
                       </span>
                       <div className="chat-body clearfix">
                          <div className="header_sec">
                             <strong className="primary-font">Jack Sparrow</strong> <strong className="pull-right">09:45AM</strong>
                          </div>
                          <div className="contact_sec">
                             <strong className="primary-font">(123) 123-456</strong> <span className="badge pull-right">3</span>
                          </div>
                       </div>
                    </li>
                 </ul>
              </div>
          </div>
      </div>
    )
  }
}

export default UserList;
