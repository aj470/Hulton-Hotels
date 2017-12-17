import axios from 'axios';

export function fetchResv(cid) {
	console.log('hello reached fetchResv action', cid);
	return dispatch => {
		axios.get('/users/reservations')
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'FETCH_RESV',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'FETCH_ERR',
				payload: error.message
	        });
	    });
	}
}

export function fetchFood(invoice) {
	console.log('hello reached fetchFood action', invoice);
	if (invoice.length === 0) {
		return dispatch => {dispatch({ type: 'FETCH_EMPTY', payload: 'empty request'})}
	}
	return dispatch => {
		axios.post('/users/reservations/breakfast', {
			Invoice_no: invoice
		})
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'FETCH_BREAKFAST',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'FETCH_ERR',
				payload: error.message
	        });
	    });
	}
}

export function fetchService(invoice) {
	console.log('hello reached fetchService action', invoice);
	if (invoice.length === 0) {
		return dispatch => {dispatch({ type: 'FETCH_EMPTY', payload: 'empty request'})}
	}
	return dispatch => {
		axios.post('/users/reservations/service', {
			Invoice_no: invoice
		})
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'FETCH_SERVICE',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'FETCH_ERR',
				payload: error.message
	        });
	    });
	}
}

export function addFood(request) {
	console.log('hello reached addFood action', request);
	// Invoice_no, bType, HotelID, Times_req
	// we will have 1 Invoice_no, HotelID, and default 1 Times_req, but multiple bType
	if (request.length === 0) {
		return dispatch => {dispatch({ type: 'FETCH_EMPTY', payload: 'empty request'})}
	}
	return dispatch => {
		axios.post('/services/breakfast', {
			breakfast: request
		})
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'ADD_BREAKFAST',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'FETCH_ERR',
				payload: error.message
	        });
	    });
	}
}

export function addService(request) {
	console.log('hello reached addService action', request);
	// Invoice_no, sType, HotelID, Times_req
	// we will have 1 Invoice_no, HotelID, and default 1 Times_req, but multiple sType
	if (request.length === 0) {
		return dispatch => {dispatch({ type: 'FETCH_EMPTY', payload: 'empty request'})}
	}
	return dispatch => {
		axios.post('/services/service', {
			service: request
		})
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'ADD_SERVICE',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'FETCH_ERR',
				payload: error.message
	        });
	    });
	}
}