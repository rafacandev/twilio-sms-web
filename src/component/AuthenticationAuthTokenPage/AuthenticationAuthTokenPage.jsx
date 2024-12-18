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
import { hasPermissions } from "../../js/hasTwilioPermissions"
import { DockedLayoutBlankNavBar } from "../DockedLayout/DockedLayout"

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
    history.push("/phone-numbers")
  }

  const handleSignIn = () => {
    setLoading(true)
    const auth = new Authentication(accountSid, authToken, "", "", AuthenticationMethod.AUTH_TOKEN)
    hasPermissions(auth).then(handlePhoneNumbersSuccess).catch(handleError)
  }

  return (
    <DockedLayoutBlankNavBar>
      <h4>Authentication with Auth Token</h4>
      <ErrorLabel error={error} />
      <AuthenticationAuthTokenView
        accountSid={accountSid}
        authToken={authToken}
        onAccountSidChange={setAccountSid}
        onAuthTokenChange={setAuthToken}
        loading={loading}
        onSignIn={handleSignIn}
        onCancel={handleCancel}
      />
    </DockedLayoutBlankNavBar>
  )
}
