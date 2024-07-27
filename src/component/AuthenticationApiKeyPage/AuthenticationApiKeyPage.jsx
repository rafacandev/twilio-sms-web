import {
  Authentication,
  AuthenticationMethod,
  mapAuthenticationError,
  useAuthentication,
} from "../../context/AuthenticationProvider"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { DefaultLayout } from "../DefaultLayout/DefaultLayout"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { AuthenticationApiKeyView } from "./AuthenticationApiKeyPageView"
import { hasPermissions } from "../../js/hasTwilioPermissions"

export const AuthenticationApiKeyPage = () => {
  const [authentication, setAuthentication] = useAuthentication()
  const [accountSid, setAccountSid] = useState(authentication.accountSid)
  const [apiKey, setApiKey] = useState(authentication.apiKey)
  const [apiSecret, setApiSecret] = useState(authentication.apiSecret)
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
      apiKey,
      apiSecret,
      method: AuthenticationMethod.API_KEY,
    })
    history.push("/phone-numbers")
  }

  const handleSignIn = () => {
    setLoading(true)
    const auth = new Authentication(accountSid, "", apiKey, apiSecret, AuthenticationMethod.API_KEY)
    hasPermissions(auth).then(handlePhoneNumbersSuccess).catch(handleError)
  }

  return (
    <DefaultLayout>
      <h4>Authentication with Api Key</h4>
      <ErrorLabel error={error} />
      <AuthenticationApiKeyView
        accountSid={accountSid}
        apiKey={apiKey}
        apiSecret={apiSecret}
        loading={loading}
        onAccountSidChange={setAccountSid}
        onApiKeyChange={setApiKey}
        onApiSecretChange={setApiSecret}
        onSignIn={handleSignIn}
        onCancel={handleCancel}
      />
    </DefaultLayout>
  )
}
