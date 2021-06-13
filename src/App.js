import './App.css'

import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";

import {AuthenticationProvider} from "./context/AuthenticationProvider";
import AuthenticationPage from "./component/AuthenticationPage/AuthenticationPage"
import MessagesPage from "./component/MessagesPage/MessagesPage"

/*
 * Spectre CSS Imports
 * See: https://picturepan2.github.io/spectre/getting-started/installation.html
 */
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-exp.css'
import 'spectre.css/dist/spectre-icons.css'

const App = () => {
  return (
    <div className="App">
      <AuthenticationProvider>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={AuthenticationPage}/>
            <Route path="/authentication" component={AuthenticationPage}/>
            <Route path="/phone-numbers" component={MessagesPage}/>
          </Switch>
        </HashRouter>
      </AuthenticationProvider>
    </div>
  )
}

export default App
