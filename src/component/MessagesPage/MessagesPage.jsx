import {useState} from "react";
import {Tabs} from "./MessagesPageView";
import {useAuthentication} from "../../context/AuthenticationProvider";
import {useHistory} from "react-router-dom";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import PhoneNumberSelector from "../PhoneNumberSelector/PhoneNumberSelector";
import MessageList from "../MessageList/MessageList";

const MessagesPage = () => {
  const [error, setError] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [authentication] = useAuthentication()
  const history = useHistory()

  const handleError = (err) => setError(err)

  const handlePhoneNumberChange = (v) => setPhoneNumber(v)

  const loadingPhoneNumbers = phoneNumber.length === 0

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push('/authentication')
    return null
  }

  return <DefaultLayout>
    <h4>Messages</h4>
    <ErrorLabel error={error}/>
    <PhoneNumberSelector onError={handleError} onPhoneNumberChange={handlePhoneNumberChange}/>
    {!loadingPhoneNumbers && <Tabs/>}
    {!loadingPhoneNumbers && <MessageList phoneNumber={phoneNumber}/>}
  </DefaultLayout>
}

export default MessagesPage