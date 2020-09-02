import * as Actions from '../actions';

const initialState = {
	payload: null,
	loadingPayload: true
};

const payloadReducer = function(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_PAYLOAD: {
			return {
				...state,
				loadingPayload: false,
				payload: action.payload
			};
		}
		case Actions.SET_PAYLOAD_LOADER: {
			return {
				...state,
				loadingpayload: action.payload
			};
		}

		default: {
			return state;
		}
	}
};
export default payloadReducer;
