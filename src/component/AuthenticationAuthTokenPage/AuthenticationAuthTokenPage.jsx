import ErrorLabel from "../ErrorLabel/ErrorLabel"
import DefaultLayout from "../DefaultLayout/DefaultLayout"
import AuthenticationAuthTokenView from "./AuthenticationAuthTokenPageView"
import {
  Authentication,
  AuthenticationMethod,
  mapAuthenticationError,
  useAuthentication,
} from "../../context/AuthenticationProvider"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { getTwilioPhoneNumbers } from "../../hook/usetGetTwilioPhoneNumbers"

const AuthenticationAuthTokenPage = () => {
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
    /*
    * We want to get phone numbers after sign-in because at minimum we want to know
    * if the credentials have permissions for it before moving forward
    *
    * TODO: Get a list of permissions from Twilio and controll what the user may or may not do.
    */
    const auth = new Authentication(accountSid, authToken, "", "", AuthenticationMethod.AUTH_TOKEN)
    getTwilioPhoneNumbers(auth, 1).then(handlePhoneNumbersSuccess).catch(handleError)
  }

  return (
    <DefaultLayout>
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
    </DefaultLayout>
  )
}

export default AuthenticationAuthTokenPage
