import axios from 'axios';
import dateFormat from 'dateformat';

export function reserve(state, start, end, hotel, exp) {
	console.log('hello reached reserve action ', exp);
	return dispatch => {
		axios.post('/reserve/card', {
			cnum: state.cnum,
			cvv: state.cvv,
			type: state.type,
			name: state.name,
			address: state.address,
			exp: exp
		})
		.then(function (res) {
			console.log("response from card: ",res);
			return axios.post('/reserve/reservation', {
				cnum: state.cnum,
				start: start,
				end: end,
				total: hotel.Price,
				room: hotel.Room_no,
				hotelID: hotel.HotelID
			})
		})
	    .then(function (res) {
			console.log("made reservation: ",res.data);
	        dispatch({
				type: 'RESERVE_SUCCESS',
				payload: null
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'RESERVE_ERR',
				payload: error.message
	        });
	    });
	}
}