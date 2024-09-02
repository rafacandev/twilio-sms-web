/*
 * Spectre CSS Imports
 * See: https://picturepan2.github.io/spectre/getting-started/installation.html
 */
import "spectre.css/dist/spectre.min.css"
import "spectre.css/dist/spectre-exp.css"
import "spectre.css/dist/spectre-icons.css"

import "./App.css"

import React from "react"
import { HashRouter, Route, Switch } from "react-router-dom"

import { AuthenticationProvider } from "./context/AuthenticationProvider"
import { ComposerProvider } from "./context/ComposerProvider"
import { AuthenticationPage } from "./component/AuthenticationPage/AuthenticationPage"
import { MessagesPage } from "./component/MessagesPage/MessagesPage"
import { AuthenticationAuthTokenPage } from "./component/AuthenticationAuthTokenPage/AuthenticationAuthTokenPage"
import { AuthenticationApiKeyPage } from "./component/AuthenticationApiKeyPage/AuthenticationApiKeyPage"
import { NotificationsPage } from "./component/NotificationsPage/NotificationsPage"
import { AuthenticatedRoute } from "./component/AuthenticatedRoute/AuthentiatedRoute"
import { UiPage } from "./component/UiPage/UiPage"
import { NotFoundPage } from "./component/NotFoundPage/NotFoundPage"
import { Inbox } from "./component/Inbox/Inbox"
import { ConversationPage } from "./component/ConversationPage/ConversationPage"

export const App = () => {
  return (
    <div className="App">
      <AuthenticationProvider>
        <ComposerProvider>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={AuthenticationPage} />
              <Route path="/authentication" component={AuthenticationPage} />
              <Route path="/authentication-token" component={AuthenticationAuthTokenPage} />
              <Route path="/authentication-api-key" component={AuthenticationApiKeyPage} />
              <AuthenticatedRoute path="/phone-numbers" component={MessagesPage} retirectTo="/authentication" />
              <AuthenticatedRoute path="/notifications" component={NotificationsPage} retirectTo="/authentication" />
              <AuthenticatedRoute path="/inbox" component={Inbox} retirectTo="/authentication" />
              <AuthenticatedRoute
                path="/conversation/:from/:to"
                component={ConversationPage}
                retirectTo="/authentication"
              />
              <Route path="/ui" component={UiPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </HashRouter>
        </ComposerProvider>
      </AuthenticationProvider>
    </div>
  )
}
