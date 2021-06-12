import {useHistory} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationProvider";
import {useState} from "react";

const AuthenticationPage = () => {
  const history = useHistory()
  const [accountSid, setAccountSid] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [, setAuthentication] = useAuthentication()
  const navigateToPhoneNumbersPage = () => history.push('/phone-numbers')

  const handleSubmit = (event) => {
    event.preventDefault()
    setAuthentication({accountSid, authToken})
  }

  return <>
    <form onSubmit={handleSubmit}>
      <label>AccountSid<input type="text" onChange={e => setAccountSid(e.target.value)}/></label>
      <label>Auth Token<input type="text" onChange={e => setAuthToken(e.target.value)}/></label>
      <button onClick={navigateToPhoneNumbersPage}>Phone Numbers</button>
      <button type="submit">Authenticate</button>
    </form>
  </>
}

export default AuthenticationPage