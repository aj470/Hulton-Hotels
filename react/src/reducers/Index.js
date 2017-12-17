import Login from './Login';
import User from './User';
import Search from './Search';
import Review from './Review';
import Best from './Best';
import { combineReducers } from 'redux';

// so now userReducer receives only the user part of the state
// similarly, billsReducer receives only the bills part of the sate
const combinedReducers = combineReducers({
	User,
	Search,
	Review,
	Best
});

export default combinedReducers;