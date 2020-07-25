import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import App from './App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from "redux";
import * as serviceWorker from './Utils/serviceWorker';
import {BrowserRouter} from "react-router-dom";
import reducer from './Redux/Reducers/RootReducer'
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk))

const app =
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>

ReactDOM.render(
  app,
   document.getElementById('root')
);


serviceWorker.unregister();
