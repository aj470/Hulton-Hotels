const initialState = {
	reviews: [],
	error: ""
}
export default (state=initialState, action) => {
	switch (action.type){
		case 'POST_REVIEW_SUCCESS':
			console.log('in POST_REVIEW_SUCCESS reducer');
			return state;
		case 'POST_REVIEW_ERR':
			console.log('in POST_REVIEW_ERR reducer');
			return { ...state, error: action.payload, reviews:[] };
		case 'GET_REVIEW_SUCCESS':
			console.log('in GET_REVIEW_SUCCESS reducer');
			return {...state, reviews: action.payload};
		case 'GET_REVIEW_ERR':
			console.log('in GET_REVIEW_ERR reducer');
			return { ...state, error: action.payload, reviews: [] };
		default:
			return state;
	}
};