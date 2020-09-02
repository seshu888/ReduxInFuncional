import axios from 'axios';


export const GET_HISTORY = 'GET HISTORY';
export const SET_HISTORY_LOADER = 'SET HISTORY LOADER';

export function getHistory() {
	const request = axios.get('https://api.spacexdata.com/v3/history');
	return (dispatch) =>
		request.then((response) => {
			dispatch({
				type: GET_HISTORY,
				payload: response.data
			});
		});
}
export function setHistoryLoader(value) {
	return {
		type: SET_HISTORY_LOADER,
		payload: value
	};
}
