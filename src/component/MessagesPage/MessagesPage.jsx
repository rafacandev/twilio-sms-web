import {useState} from "react";
import {Tabs} from "./MessagesPageView";
import {useAuthentication} from "../../context/AuthenticationProvider";
import {useHistory} from "react-router-dom";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import PhoneNumberSelector from "../PhoneNumberSelector/PhoneNumberSelector";

const MessagesPage = () => {
  const [error, setError] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [authentication] = useAuthentication()
  const history = useHistory()

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push('/authentication')
    return null
  }

  const handleError = (err) => setError(err)

  const handlePhoneNumberChange = (v) => setPhoneNumber(v)

  const isPhoneNumberSelected = phoneNumber.length === 12

  return <DefaultLayout>
    <h4>Messages</h4>
    <ErrorLabel error={error}/>
    <PhoneNumberSelector onError={handleError} onPhoneNumberChange={handlePhoneNumberChange}/>
    {isPhoneNumberSelected && <Tabs phoneNumber={phoneNumber}/>}
  </DefaultLayout>
}

export default MessagesPage
