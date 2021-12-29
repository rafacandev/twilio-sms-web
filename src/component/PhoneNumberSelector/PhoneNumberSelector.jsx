import Select from 'react-select'
import {useEffect, useState} from "react";
import useGetTwilioPhoneNumbers from "../../hook/useGetTwilioPhoneNumbers";
import "./PhoneNumberSelector.css"

const PhoneNumberSelector = ({ onError = () => {},
                               onComplete = () => {},
                               onPhoneNumberChange = () => {}}) => {
  const [loading, setLoading] = useState(true);
  const [phoneNumbers, setPhoneNumbers] = useState([])

  const handleOnComplete = () => {
    setLoading(false)
    onComplete()
  }

  const handleOnChange = (event) => {
    onPhoneNumberChange(event.value)
  }

  const handleGetPhoneNumberSuccess = (response) => {
    const result = response?.data?.incoming_phone_numbers
      .filter(pn => pn.capabilities.sms)
      .map(pn => pn.phone_number)
      .sort()
    setPhoneNumbers(result)
  }

  const getPhoneNumbers = useGetTwilioPhoneNumbers({
    onSuccess: handleGetPhoneNumberSuccess,
    onError: onError,
    onComplete: handleOnComplete
  })

  // TODO: Currently, this mask is limited to country code +1; we need a mask for all country codes
  const maskPhoneNumber = v => {
    let result = v.substr(0, 2)
    result += ' ' + v.substr(2, 3)
    result += ' ' + v.substr(5, 3)
    result += ' ' + v.substr(8)
    return result
  }

  const phoneNumberOptions = phoneNumbers.map(v => ({value: v, label: maskPhoneNumber(v)}))

  const placeHolderText = loading ? 'Loading phone numbers...' : 'Select (or type) a phone number...'

  // Get available phone number on first render
  useEffect(() => {
    if (phoneNumbers.length === 0) {
      getPhoneNumbers()
    }
  }, [getPhoneNumbers, phoneNumbers])

  return <Select
      placeholder={placeHolderText}
      isLoading={loading}
      options={phoneNumberOptions}
      onChange={handleOnChange}
  />
}

export default PhoneNumberSelector
