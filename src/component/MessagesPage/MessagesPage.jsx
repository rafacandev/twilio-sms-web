import {useAuthentication} from "../../context/AuthenticationProvider";
import useGetTwilioPhoneNumbers from "../../hook/useGetTwilioPhoneNumbers";
import {useEffect, useState} from "react";
import MessagesPageView from "./MessagesPageView";

const MessagesPage = () => {
  const [authentication] = useAuthentication()
  const [error, setError] = useState(null)
  const [loadingPhoneNumbers, setLoadingPhoneNumbers] = useState(true)
  const [phoneNumbers, setPhoneNumbers] = useState([])

  const handleError = (err) => setError(err)

  const handleGetPhoneNumberComplete = () => setLoadingPhoneNumbers(false)

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
    loadingPhoneNumbers={loadingPhoneNumbers}
  />
}

export default MessagesPage