import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { AuthenticationAuthTokenView } from "./AuthenticationAuthTokenPageView"
import {
  Authentication,
  AuthenticationMethod,
  mapAuthenticationError,
  useAuthentication,
} from "../../context/AuthenticationProvider"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { validatePermission } from "../../js/validateTwilioPermission"
import { LayoutWithoutNavBar } from "../Layout/Layout"

export const AuthenticationAuthTokenPage = () => {
  const [authentication, setAuthentication] = useAuthentication()
  const [accountSid, setAccountSid] = useState(authentication.accountSid)
  const [authToken, setAuthToken] = useState(authentication.authToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()

  const handleError = err => {
    setError(mapAuthenticationError(err))
    setLoading(false)
  }

  const handleCancel = () => history.push("/authentication")

  const handlePhoneNumbersSuccess = () => {
    setAuthentication({
      accountSid,
      authToken,
      method: AuthenticationMethod.AUTH_TOKEN,
    })
    history.push("/inbox")
  }

  const handleSignIn = () => {
    setLoading(true)
    const auth = new Authentication(accountSid, authToken, "", "", AuthenticationMethod.AUTH_TOKEN)
    validatePermission(auth).then(handlePhoneNumbersSuccess).catch(handleError)
  }

  return (
    <LayoutWithoutNavBar>
      <h4>Authentication with Auth Token</h4>
      <p className="my-4">
        You can use your main account credentials (Account SID and Auth Token) to access Twilio for your main or
        subaccounts.
        <a
          href="https://help.twilio.com/articles/223136027-Auth-Tokens-and-How-to-Change-Them"
          target="_blank"
          rel="noreferrer"
        >
          See Twilio Auth Token
        </a>
      </p>
      <ErrorLabel error={error} className="mt-6" onClose={() => setError(null)} />
      <AuthenticationAuthTokenView
        accountSid={accountSid}
        authToken={authToken}
        onAccountSidChange={setAccountSid}
        onAuthTokenChange={setAuthToken}
        loading={loading}
        onSignIn={handleSignIn}
        onCancel={handleCancel}
      />
    </LayoutWithoutNavBar>
  )
}
