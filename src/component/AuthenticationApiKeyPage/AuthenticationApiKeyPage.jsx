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
import { getTwilioPhoneNumbersByPage } from "../../core/getTwilioPhoneNumbersByPage"

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
    /*
     * We want to get phone numbers after sign-in because at minimum we want to know
     * if the credentials have permissions for it before moving forward
     *
     * TODO: Get a list of permissions from Twilio and controll what the user may or may not do.
     */
    const auth = new Authentication(accountSid, "", apiKey, apiSecret, AuthenticationMethod.API_KEY)
    getTwilioPhoneNumbersByPage(auth).then(handlePhoneNumbersSuccess).catch(handleError)
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
