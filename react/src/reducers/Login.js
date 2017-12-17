const initialState = {
	isLoggedIn: false,
	name: '',
	phone: '',
	address: '',
	email: '',
	cid: ''
}
export default (state=initialState, action) => {
	switch (action.type){
		case 'LOGIN_USER':
			console.log('in LOGIN_USER reducer');
			return { ...state, isLoggedIn: true, name: action.payload.Name, phone: action.payload.Phone_no,
					address: action.payload.Address, email: action.payload.Email, cid: action.payload.CID };
		case 'LOGOUT_USER':
			console.log('in LOGOUT_USER reducer');
			return { ...state, isLoggedIn: false, name: "", phone: "",
					address: "", email: "", cid: "" };
		default:
			return state;
	}
};