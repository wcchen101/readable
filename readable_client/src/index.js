import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { createStore, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'

import App from './components/App'

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
