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

class Payload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payload: null,
			allPayload: null,
			count: 0,
			page: 0,
			rowsPerPage: 10
		};
	}
	componentDidMount() {
		this.props.getPayload();
		this.props.setPayloadLoader(true);
	}
	componentDidUpdate(prevProps) {
		if ((!this.state.allPayload && this.props.payload) || prevProps.payload !== this.props.payload) {
			this.setState({ allPayload: this.props.payload, count: this.props.payload.length });
			this.updateData(this.props.payload, this.state.page, this.state.rowsPerPage);
		}
	}
	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
		this.updateData(this.state.allPayload, newPage, this.state.rowsPerPage);
	};
	handleChangeRowsPerPage = (event) => {
		let rowsPerPage = parseInt(event.target.value);
		this.setState({ rowsPerPage: rowsPerPage, page: 0 });
		this.updateData(this.state.allPayload, 0, rowsPerPage);
	};

	updateData = (data, page, rowsPerPage) => {
		console.log(page, rowsPerPage);
		this.setState({
			payload: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		});
	};

	handleSearch = (e) => {
		let text = e.target.value;
		let { payload } = this.props;
		let allPayload = payload;
		allPayload = allPayload.filter((item) => {
			return item.payload_id.toLowerCase().includes(text.toLowerCase());
		});
		this.setState({ allPayload });
		this.updateData(allPayload, 0, this.state.rowsPerPage);
	};

	render() {
		const { page, count, rowsPerPage, payload } = this.state;
		const { loadingPayload } = this.props;
		return (
			<div className="payloadPage">
				<div style={{ marginBottom: 10 }}>
					<Link to="/" style={{ fontSize: 20 }}>
						Home
					</Link>
				</div>
				<TableContainer component={Paper}>
					{loadingPayload ? (
						<div style={{ padding: 30, textAlign: 'center', fontSize: 30 }}>loading...</div>
					) : (
						<React.Fragment>
							<Paper component="form" style={{ marginBottom: 16, padding: '8px 20px' }}>
								<InputBase
									placeholder="Search with payload id"
									onChange={this.handleSearch}
									style={{ width: '100%' }}
								/>
							</Paper>
							<Table aria-label="simple table">
								<TableHead className="tableHead">
									<TableRow>
										<TableCell align="center">Payload Id</TableCell>

										<TableCell align="center">Nationality</TableCell>
										<TableCell align="center">Orbit</TableCell>
										<TableCell align="center">Payload Type</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{payload &&
										payload.map((item, index) => (
											<TableRow key={index}>
												<TableCell align="center">{item.payload_id}</TableCell>

												<TableCell align="center">{item.nationality}</TableCell>

												<TableCell align="center">{item.orbit}</TableCell>
												<TableCell align="center">{item.payload_type}</TableCell>
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
			getPayload: Actions.getPayload,
			setPayloadLoader: Actions.setPayloadLoader
		},
		dispatch
	);
}
function mapStateToProps(reducer) {
	let payloadReducer = reducer.payloadReducer;
	console.log(payloadReducer);
	return {
		payload: payloadReducer.payload,
		loadingPayload: payloadReducer.loadingPayload
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Payload);
