import {useState} from "react";
import MessagesPageView from "./MessagesPageView";
import {useAuthentication} from "../../context/AuthenticationProvider";
import {useHistory} from "react-router-dom";

const MessagesPage = () => {
  const [error, setError] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [authentication] = useAuthentication()
  const history = useHistory()

  const handleError = (err) => setError(err)

  const handlePhoneNumberChange = (v) => setPhoneNumber(v)

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push('/authentication')
    return null
  }

  return <MessagesPageView
    error={error}
    loadingPhoneNumbers={phoneNumber.length === 0}
    phoneNumber={phoneNumber}
    onError={handleError}
    onPhoneNumberChange={handlePhoneNumberChange}
  />
}

export default MessagesPage