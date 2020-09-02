import { combineReducers } from 'redux';
import historyReducer from './history.reducer';
import payloadReducer from './payload.reducer';

const reducer = combineReducers({
	historyReducer,
	payloadReducer
});

export default reducer;
