import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import History from './History';
import Home from './Home';
import Payload from './Payload';

import './styles.css';
const browserHistory = createBrowserHistory();

function App() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={Home} exact={true} />
			<Route path="/history" component={History} exact={true} />
			<Route path="/payload" component={Payload} exact={true} />
		</Router>
	);
}

export default App;
