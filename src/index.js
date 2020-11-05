import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Mylink from './app/pages/mylink';
import Login from './app/component/Login/Login';
import Signup from './app/component/Signup/Signup';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>;
      <Route exact path='/signup' component={Signup}/>;
      <Route exact path ='/mylink' component={Mylink}/>;
    </Switch>
  </BrowserRouter> 
,
document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
