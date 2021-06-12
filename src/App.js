import './App.css'

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AuthenticationPage from "./component/AuthenticationPage/AuthenticationPage"
import PhoneNumbersPage from "./component/PhoneNumbersPage/PhoneNumbersPage"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={AuthenticationPage}/>
          <Route path="/authentication" component={AuthenticationPage}/>
          <Route path="/phone-numbers" component={PhoneNumbersPage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
