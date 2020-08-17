import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'materialize-css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/Store';

export const Context = createContext()

ReactDOM.render(
  <BrowserRouter>
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
