const initialState = {
	bestService: null,
	bestBreakfast: null,
	bestCustomers: null,
	bestType: null,
}
export default (state=initialState, action) => {
	switch (action.type){
		case 'GET_BEST_ROOM_SUCCESS':
			console.log('in GET_BEST_ROOM_SUCCESS reducer');
			return { ...state, bestType: action.payload };
		case 'GET_BEST_FOOD_SUCCESS':
			console.log('in GET_BEST_FOOD_SUCCESS reducer');
			return { ...state, bestBreakfast: action.payload };
		case 'GET_BEST_SERVICE_SUCCESS':
			console.log('in GET_BEST_SERVICE_SUCCESS reducer');
			return { ...state, bestService: action.payload };
		case 'GET_BEST_CUSTOMER_SUCCESS':
			console.log('in GET_BEST_CUSTOMER_SUCCESS reducer');
			return { ...state, bestCustomers: action.payload };
		case 'GET_BEST_ERR':
			console.log('in GET_BEST_ERR reducer');
			return initialState;
		default:
			return state;
	}
};