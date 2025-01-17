import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

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
            <Routes>
              <Route path="/" element={<AuthenticationPage />} />
              <Route path="/authentication" element={<AuthenticationPage />} />
              <Route path="/authentication-token" element={<AuthenticationAuthTokenPage />} />
              <Route path="/authentication-api-key" element={<AuthenticationApiKeyPage />} />
              <Route
                path="/inbox"
                element={
                  <AuthenticatedRoute>
                    <InboxPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/message/:messageSid"
                element={
                  <AuthenticatedRoute>
                    <MessagePage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/sent/:messageSid"
                element={
                  <AuthenticatedRoute>
                    <SentPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/conversation/:from/:to"
                element={
                  <AuthenticatedRoute>
                    <ConversationPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/send"
                element={
                  <AuthenticatedRoute>
                    <SendPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/send/:from/:to"
                element={
                  <AuthenticatedRoute>
                    <SendPage />
                  </AuthenticatedRoute>
                }
              />
              <Route path="/ui" element={<UiPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HashRouter>
        </ComposerProvider>
      </AuthenticationProvider>
    </div>
  )
}
