import axios from 'axios';

export function register(name, email, password, address, phone) {
  console.log('hello reached register action', phone);
  return dispatch => {
    axios.post('/login/register',{
      name: name,
      email: email,
      password: password,
      address: address,
      phone: phone
    })
    .then(function (res) {
      console.log(res);
        dispatch({
          type: 'CREATE_USER',
          payload: res.data
        });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
          type: 'LOGIN_ERR',
          payload: error.message
        });
    });
  }
}

export function login(username, password) {
	console.log('hello reached login action');
  return dispatch => {
    axios.post('/login/',{
      username: username, 
      password: password
    })
    .then(function (res) {
      console.log((response) => response.json());
        dispatch({
          type: 'LOGIN_USER',
          payload: res.data
        });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
          type: 'LOGIN_ERR',
          payload: error.message
        });
    });
  }
}

export function logout() {
	console.log('hello reached logout action');
	return dispatch => {
    axios.get('/login/logout')
    .then(function(res) {
      dispatch({
        type: 'LOGOUT_USER',
        payload: null
      });
    })
    .catch(function(error) {
      console.log(error);
      dispatch({
        type: 'LOGOUT_ERR',
        payload: error.message
      });
    });
  }
}