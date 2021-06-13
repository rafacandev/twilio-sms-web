import {useAuthentication} from "../../context/AuthenticationProvider";
import {useState} from "react";
import useGetTwilioAccount from "../../hook/useGetTwilioAccount";
import AuthenticationPageView from "./AuthenticationPageView";

const AuthenticationPage = () => {
  const [accountInfo, setAccountInfo] = useState({})
  const [authentication, setAuthentication] = useAuthentication()
  const [accountSid, setAccountSid] = useState(authentication.accountSid)
  const [authToken, setAuthToken] = useState(authentication.authToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGetAccountsSuccess = (response) => {
    const info = {
      name: response.data.friendly_name,
      type: response.data.type,
      status: response.data.status,
      dateCreated: response.data.date_created,
      dateUpdated: response.data.date_updated,
    }
    setAccountInfo(info)
  }

  const handleGetAccountsComplete = () => {
    setLoading(false)
  }

  const handleError = (err) => {
    setError(err)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setAuthentication({accountSid, authToken})
    getTwilioAccount({accountSid, authToken})
  }

  const getTwilioAccount = useGetTwilioAccount({
    onSuccess: handleGetAccountsSuccess,
    onError: handleError,
    onComplete: handleGetAccountsComplete
  })

  return <AuthenticationPageView
    accountInfo={accountInfo}
    accountSid={accountSid}
    authToken={authToken}
    error={error}
    loading={loading}
    onAccountSidChange={v => setAccountSid(v)}
    onAuthTokenChange={v => setAuthToken(v)}
    onSubmit={handleSubmit}
  />
}

export default AuthenticationPage