import axios from 'axios';

export function postReview(type, rating, review) {
	console.log('hello reached postReview action', type, rating, review);
	return dispatch => {
		axios.post('/users/review', {
			rating: rating,
			type: type,
			textComment: review
		})
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'POST_REVIEW_SUCCESS',
				payload: null
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'POST_REVIEW_ERR',
				payload: error.message
	        });
	    });
	}
}

export function getReview() {
	console.log('hello reached getReview action');
	return dispatch => {
		axios.get('/users/review')
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'GET_REVIEW_SUCCESS',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'GET_REVIEW_ERR',
				payload: null
	        });
	    });
	}
}