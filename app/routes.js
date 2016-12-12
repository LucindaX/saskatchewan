import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import SignIn from './components/SignIn';
import Register from  './components/Register';
import Chat from './components/Chat';

export default (
    <Route path='/' component={App} >
			<IndexRoute component={SignIn} />
			<Route path='/register' component={Register} />
			<Route path='/chat' component={Chat} />
		</Route>
);
