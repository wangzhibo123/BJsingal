import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import * as serviceWorker from './serviceWorker';
const defaultValue = '1234567890'
const MyContext = React.createContext(defaultValue)
console.log(MyContext)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
