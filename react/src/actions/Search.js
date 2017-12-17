import axios from 'axios';

export function searchZip(param) {
	console.log('hello reached searchZip action ', param);
	return dispatch => {
		axios.get('/search/zip/'+param)
	    .then(function (res) {
			console.log("got data",res.data);
	        dispatch({
				type: 'SEARCH_RES',
				payload: res.data
	        });
	    })
	    .catch(function (error) {
			console.log(error);
			dispatch({
				type: 'SEARCH_ERR',
				payload: error.message
	        });
	    });
	}
}

export function searchName(start, end, value) {
	console.log('hello reached searchName action ', value);
	var location = []
	try{
		location = [value.split(',')[0].trim().replace(/ /g,"%20"), value.split(',')[1].trim().replace(/ /g,"%20")];
	} catch (e) {
		location = [value.trim()]
	}
	console.log(location, location.length)
	return dispatch => {
		// /name/:startDate&:endDate/:city/:country?
		if(location.length === 1){
			axios.get("/search/name/"+start.split("T")[0]+"&"+end.split("T")[0]+"/"+encodeURIComponent(location[0]))
		    .then(function (res) {
				console.log("got data",res.data);
		        dispatch({
					type: 'SEARCH_RES',
					payload: res.data
		        });
		    })
		    .catch(function (error) {
				console.log(error);
				dispatch({
					type: 'SEARCH_ERR',
					payload: error.message
		        });
		    });
		} else {
			axios.get('/search/name/'+start.split("T")[0]+'&'+end.split("T")[0]+'/'+location[0]+'/'+location[1])
		    .then(function (res) {
				console.log("got data",res.data);
		        dispatch({
					type: 'SEARCH_RES',
					payload: res.data
		        });
		    })
		    .catch(function (error) {
				console.log(error);
				dispatch({
					type: 'SEARCH_ERR',
					payload: error.message
		        });
		    });
		}
	}
}