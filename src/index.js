import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Mylink from "./app/pages/mylink";
import Signup from "./app/component/Signup/Signup";
import Appearance from "./app/component/Apperance/appearance";
import Settings from "./app/pages/settings";
import ForgotPassword from "./app/component/ForgotPassword/ForgotPassword";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import everyReducer from "./app/Redux/Reducer/index";
import { createStore } from "redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const store = createStore(
  everyReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const options = {
  // you can also just use 'bottom center'
  position: positions.Top_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />;
          <Route exact path="/appearance" component={App} />;
          <Route exact path="/settings" component={App} />;
          <Route exact path="/signup" component={Signup} />;
          <Route exact path="/fotgotPassword" component={ForgotPassword} />;
          <Route exact path="/:mylinkid">
            <Mylink />
          </Route>
        </Switch>
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
