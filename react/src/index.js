import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import reducer from './reducers/Index';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'; 
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(reducer, persistedState, applyMiddleware(ReduxThunk, logger));
store.subscribe(throttle(() => {
	saveState(store.getState());
}), 2000);

ReactDOM.render(<Provider store={store}>
 <App /> 
 </Provider>, document.getElementById('root'));
registerServiceWorker();
