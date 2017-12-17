const initialState = {
	isLoggedIn: false,
	signedUp: false,
	name: '',
	phone: '',
	address: '',
	email: '',
	cid: '',
	reservations: [],
	breakfast: [],
	service: [],
	error: ""
}
export default (state=initialState, action) => {
	switch (action.type){
		case 'CREATE_USER':
			return { ...state, signedUp: true};
		case 'LOGIN_USER':
			console.log('in LOGIN_USER reducer');
			return { ...state, isLoggedIn: true, name: action.payload.Name, phone: action.payload.Phone_no,
					address: action.payload.Address, email: action.payload.Email, cid: action.payload.CID };
		case 'LOGOUT_USER':
			console.log('in LOGOUT_USER reducer');
			return initialState;
		case 'FETCH_RESV':
			console.log('in LOGIN_USER reducer');
			return { ...state, reservations: action.payload, error: "" };
		case 'FETCH_BREAKFAST':
			console.log('in FETCH_BREAKFAST reducer');
			return { ...state, breakfast: action.payload, error: "" };
		case 'FETCH_SERVICE':
			console.log('in FETCH_SERVICE reducer');
			return { ...state, service: action.payload, error: "" };
		case 'ADD_BREAKFAST':
			return state;
		case 'ADD_SERVICE':
			return state;
		case 'FETCH_ERR':
			console.log('in FETCH_ERR reducer');
			return { ...state, error: action.payload };
		default:
			return state;
	}
};