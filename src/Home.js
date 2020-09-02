import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: null
		};
	}
	handleClick = (route) => {
		this.props.history.push(route);
	};
	render() {
		return (
			<div className="homePage">
				<Paper className="card" onClick={() => this.handleClick('/history')}>
					<h2>History</h2>
				</Paper>
				<Paper className="card" onClick={() => this.handleClick('/payload')}>
					<h2>Payload</h2>
				</Paper>
			</div>
		);
	}
}
export default Home;
