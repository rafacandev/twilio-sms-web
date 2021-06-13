import {useHistory} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationProvider";
import {useState} from "react";
import useGetTwilioAccount from "../../hook/useGetTwilioAccount";
import ErrorHeader from "../ErrorHeader/ErrorHeader";
import LoadingHeader from "../LoadingHeader/LoadingHeader";

const AuthenticationPage = () => {
  const history = useHistory()
  const [accountInfo, setAccountInfo] = useState({})
  const [accountSid, setAccountSid] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [, setAuthentication] = useAuthentication()

  const navigateToPhoneNumbersPage = (event) => {
    event.preventDefault()
    history.push('/phone-numbers')
  }

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

  const AccountDetails = () => {
    if (Object.keys(accountInfo).length === 0) return null
    return <div>
      <p>Account Details</p>
      <p>Name: {accountInfo.name}</p>
      <p>Type: {accountInfo.type}</p>
      <p>Status: {accountInfo.status}</p>
      <p>Date Created: {accountInfo.dateCreated}</p>
      <p>Date Updated: {accountInfo.dateUpdated}</p>
    </div>
  }

  return <>
    <ErrorHeader error={error}/>
    <LoadingHeader loading={loading}/>
    <form onSubmit={handleSubmit}>
      <label>AccountSid<input type="text" name="AccountSid" onChange={e => setAccountSid(e.target.value)}/></label>
      <label>Auth Token<input type="text" name="AuthToken" onChange={e => setAuthToken(e.target.value)}/></label>
      <button onClick={navigateToPhoneNumbersPage}>Phone Numbers</button>
      <button type="submit">Authenticate</button>
    </form>
    <AccountDetails/>
  </>
}

export default AuthenticationPage