const initialState = {
	hotels: [],
	error: ""
}
export default (state=initialState, action) => {
	switch (action.type){
		case 'SEARCH_RES':
			console.log('in SEARCH_RES reducer');
			return { ...state, hotels: action.payload };
		case 'SEARCH_ERR':
			console.log('in SEARCH_ERR reducer');
			return { ...state, error: action.payload, hotels: []};
		default:
			return initialState;
	}
};