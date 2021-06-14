import {useHistory} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationProvider";
import useGetTwilioPhoneNumbers from "../../hook/useGetTwilioPhoneNumbers";
import {useEffect, useState} from "react";
import MessagesPageView from "./MessagesPageView";

const MessagesPage = () => {
  const history = useHistory()
  const [authentication] = useAuthentication()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const navigateToAuthenticationPage = () => history.push('/authentication')

  const handleError = (err) => setError(err)

  const handleGetPhoneNumberComplete = () => setLoading(false)

  const handleGetPhoneNumberSuccess = (response) => {
    const result = response.data.incoming_phone_numbers
      .filter(pn => pn.capabilities.sms)
      .map(pn => pn.phone_number)
      .sort()
    setPhoneNumbers(result)
  }

  const getPhoneNumbers = useGetTwilioPhoneNumbers({
    onSuccess: handleGetPhoneNumberSuccess,
    onError: handleError,
    onComplete: handleGetPhoneNumberComplete
  })

  useEffect(() => {
    getPhoneNumbers()
  }, [])

  return <MessagesPageView
    accountName={authentication?.accountInfo?.name}
    error={error}
    phoneNumbers={phoneNumbers}
  />
}

export default MessagesPage