import './App.css'

import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";

import {AuthenticationProvider} from "./context/AuthenticationProvider";
import AuthenticationPage from "./component/AuthenticationPage/AuthenticationPage"
import PhoneNumbersPage from "./component/PhoneNumbersPage/PhoneNumbersPage"

const App = () => {
  return (
    <div className="App">
      <AuthenticationProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={AuthenticationPage}/>
          <Route path="/authentication" component={AuthenticationPage}/>
          <Route path="/phone-numbers" component={PhoneNumbersPage}/>
        </Switch>
      </HashRouter>
      </AuthenticationProvider>
    </div>
  )
}

export default App
