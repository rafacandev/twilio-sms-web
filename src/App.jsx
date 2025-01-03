import React from "react"
import { HashRouter, Route, Switch } from "react-router-dom"

import { AuthenticationProvider } from "./context/AuthenticationProvider"
import { ComposerProvider } from "./context/ComposerProvider"
import { AuthenticationPage } from "./component/AuthenticationPage/AuthenticationPage"
import { AuthenticationAuthTokenPage } from "./component/AuthenticationAuthTokenPage/AuthenticationAuthTokenPage"
import { AuthenticationApiKeyPage } from "./component/AuthenticationApiKeyPage/AuthenticationApiKeyPage"
import { AuthenticatedRoute } from "./component/AuthenticatedRoute/AuthentiatedRoute"
import { UiPage } from "./component/UiPage/UiPage"
import { NotFoundPage } from "./component/NotFoundPage/NotFoundPage"
import { InboxPage } from "./component/InboxPage/InboxPage"
import { ConversationPage } from "./component/ConversationPage/ConversationPage"
import { SendPage } from "./component/SendPage/SendPage"
import { MessagePage } from "./component/MessagePage/MessagePage"
import { SentPage } from "./component/SentPage/SentPage"

export const App = () => {
  return (
    <div className="h-full">
      <AuthenticationProvider>
        <ComposerProvider>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={AuthenticationPage} />
              <Route path="/authentication" component={AuthenticationPage} />
              <Route path="/authentication-token" component={AuthenticationAuthTokenPage} />
              <Route path="/authentication-api-key" component={AuthenticationApiKeyPage} />
              <AuthenticatedRoute path="/inbox" component={InboxPage} retirectTo="/authentication" />
              <AuthenticatedRoute path="/message/:messageSid" component={MessagePage} retirectTo="/authentication" />
              <AuthenticatedRoute path="/sent/:messageSid" component={SentPage} retirectTo="/authentication" />
              <AuthenticatedRoute
                path="/conversation/:from/:to"
                component={ConversationPage}
                retirectTo="/authentication"
              />
              <AuthenticatedRoute path="/send" component={SendPage} retirectTo="/authentication" />
              <Route path="/ui" component={UiPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </HashRouter>
        </ComposerProvider>
      </AuthenticationProvider>
    </div>
  )
}
