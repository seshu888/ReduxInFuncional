import axios from 'axios';


export const GET_PAYLOAD = 'GET PAYLOAD';
export const SET_PAYLOAD_LOADER = 'SET PAYLOAD LOADER';

export function getPayload() {
	const request = axios.get('https://api.spacexdata.com/v3/payloads');
	return (dispatch) =>
		request.then((response) => {
			dispatch({
				type: GET_PAYLOAD,
				payload: response.data
			});
		});
}
export function setPayloadLoader(value) {
	return {
		type: SET_PAYLOAD_LOADER,
		payload: value
	};
}
