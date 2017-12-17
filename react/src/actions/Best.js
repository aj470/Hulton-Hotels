import axios from 'axios';

export function bestRoom(start, end) {
	console.log('hello reached bestRoom action ');
	return dispatch => {
		axios.get('/best/room/'+start.split("T")[0]+'&'+end.split("T")[0])
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'GET_BEST_ROOM_SUCCESS',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'GET_BEST_ERR',
				payload: error.message
	        });
	    });
	}
}

export function bestBreakfast(start, end) {
	console.log('hello reached bestBreakfast action ');
	return dispatch => {
		axios.get('/best/breakfast/'+start.split("T")[0]+'&'+end.split("T")[0])
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'GET_BEST_FOOD_SUCCESS',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'GET_BEST_ERR',
				payload: error.message
	        });
	    });
	}
}

export function bestService(start, end) {
	console.log('hello reached bestService action ');
	return dispatch => {
		axios.get('/best/service/'+start.split("T")[0]+'&'+end.split("T")[0])
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'GET_BEST_SERVICE_SUCCESS',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'GET_BEST_ERR',
				payload: error.message
	        });
	    });
	}
}

export function bestCustomer(start, end) {
	console.log('hello reached bestCustomer action ');
	return dispatch => {
		axios.get('/best/customers/'+start.split("T")[0]+'&'+end.split("T")[0])
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'GET_BEST_CUSTOMER_SUCCESS',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'GET_BEST_ERR',
				payload: error.message
	        });
	    });
	}
}