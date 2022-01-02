import {
  Authentication,
  AuthenticationMethod,
  mapAuthenticationError,
  useAuthentication
} from "../../context/AuthenticationProvider";
import {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import AuthenticationApiKeyForm from "./AuthenticationApiKeyPageView";
import useGetTwilioPhoneNumbers from "../../hook/useGetTwilioPhoneNumbers";

const AuthenticationApiKeyPage = () => {
  const [authentication, setAuthentication] = useAuthentication()
  const authenticationRef = useRef(authentication)
  const [accountSid, setAccountSid] = useState(authentication.accountSid)
  const [apiKey, setApiKey] = useState(authentication.apiKey)
  const [apiSecret, setApiSecret] = useState(authentication.apiSecret)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()

  const handleError = (err) => {
    setError(mapAuthenticationError(err))
    setLoading(false)
  }

  const handleCancel = () => history.push('/authentication')

  const handlePhoneNumbersSuccess = () => {
    setAuthentication(authenticationRef.current)
    history.push('/phone-numbers')
  }

  const handleSignIn = () => {
    const auth = new Authentication(accountSid, '', apiKey, apiSecret, AuthenticationMethod.API_KEY)
    authenticationRef.current = auth
    setLoading(true)
    /*
     * We want to get phone numbers after sign-in because at minimum we want to know
     * if the credentials have permissions for it before moving forward
     */
    getPhoneNumbers(auth)
  }

  const getPhoneNumbers = useGetTwilioPhoneNumbers({
    onError: handleError,
    onSuccess: handlePhoneNumbersSuccess,
  })


  return <DefaultLayout>
    <h4>Authentication with Api Key</h4>
    <ErrorLabel error={error}/>
    <AuthenticationApiKeyForm
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

}

export default AuthenticationApiKeyPage
