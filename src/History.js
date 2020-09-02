import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';

import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './store/actions';

class History extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: null,
			allHistory: null,
			count: 0,
			page: 0,
			rowsPerPage: 5
		};
	}
	componentDidMount() {
		this.props.getHistory();
		this.props.setHistoryLoader(true);
	}
	componentDidUpdate(prevProps) {
		if ((!this.state.allHistory && this.props.history) || prevProps.history !== this.props.history) {
			this.setState({ allHistory: this.props.history, count: this.props.history.length });
			this.updateData(this.props.history, this.state.page, this.state.rowsPerPage);
		}
	}
	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
		this.updateData(this.state.allHistory, newPage, this.state.rowsPerPage);
	};
	handleChangeRowsPerPage = (event) => {
		let rowsPerPage = parseInt(event.target.value);
		this.setState({ rowsPerPage: rowsPerPage, page: 0 });
		this.updateData(this.state.allHistory, 0, rowsPerPage);
	};

	updateData = (data, page, rowsPerPage) => {

		this.setState({
			history: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		});
	};
	handleSearch = (e) => {
		let text = e.target.value;
		let { history } = this.props;
		let allHistory = history;
		allHistory = allHistory.filter((item) => {
			return item.title.toLowerCase().includes(text.toLowerCase());
		});
		this.setState({ allHistory });
		this.updateData(allHistory, 0, this.state.rowsPerPage);
	};

	render() {
		const { page, count, rowsPerPage, history } = this.state;
		const { loadingHistory } = this.props;
		return (
			<div className="historyPage">
				<div style={{ marginBottom: 10 }}>
					<Link to="/" style={{ fontSize: 21 }}>
						Home
					</Link>
				</div>
				<TableContainer component={Paper}>
					{loadingHistory ? (
						<div style={{ padding: 30, textAlign:'center', fontSize: 30 }}>loading...</div>
					) : (
						<React.Fragment>
							<Paper component="form" style={{ marginBottom: 16, padding: '8px 20px' }}>
								<InputBase
									placeholder="Search with history title"
									onChange={this.handleSearch}
									style={{ width: '100%' }}
								/>
							</Paper>
							<Table aria-label="simple table">
								<TableHead className="tableHead">
									<TableRow>
										<TableCell align="center">Id</TableCell>

										<TableCell align="center">Title</TableCell>
										<TableCell align="center">Date</TableCell>
										<TableCell align="center">Flight No:</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{history &&
										history.map((item, index) => (
											<TableRow key={index}>
												<TableCell align="center">{item.id}</TableCell>

												<TableCell align="center">{item.title}</TableCell>
												<TableCell align="center">
													{item.event_date_utc.substring(0, 10)}
												</TableCell>
												<TableCell align="center">{item.flight_number}</TableCell>
											</TableRow>
										))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[ 5, 10, 25 ]}
											colSpan={3}
											count={count}
											rowsPerPage={rowsPerPage}
											page={page}
											SelectProps={{
												inputProps: { 'aria-label': 'rows per page' },
												native: true
											}}
											onChangePage={this.handleChangePage}
											onChangeRowsPerPage={this.handleChangeRowsPerPage}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</React.Fragment>
					)}
				</TableContainer>
			</div>
		);
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getHistory: Actions.getHistory,
			setHistoryLoader: Actions.setHistoryLoader
		},
		dispatch
	);
}
function mapStateToProps(reducer) {
	let historyReducer = reducer.historyReducer;
	return {
		history: historyReducer.history,
		loadingHistory: historyReducer.loadingHistory
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
