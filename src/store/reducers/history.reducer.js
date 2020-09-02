import * as Actions from '../actions';

const initialState = {
	history: null,
	loadingHistory: true
};

const historyReducer = function(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_HISTORY: {
			return {
				...state,
				loadingHistory: false,
				history: action.payload
			};
		}
		case Actions.SET_HISTORY_LOADER: {
			return {
				...state,
				loadingHistory: action.payload
			};
		}

		default: {
			return state;
		}
	}
};
export default historyReducer;
