import Select from "react-select"
import { useEffect, useState, useCallback } from "react"
import "./PhoneNumberSelector.css"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { getAllTwilioPhoneNumbers } from "../../hook/getTwilioPhoneNumbers"

// TODO: Currently, this mask is limited to country code +1; we need a mask for all country codes
const maskPhoneNumber = v => {
  let result = v.substr(0, 2)
  result += " " + v.substr(2, 3)
  result += " " + v.substr(5, 3)
  result += " " + v.substr(8)
  return result
}

const PhoneNumberSelector = ({ onError = () => {}, onPhoneNumberChange = () => {} }) => {
  const [authentication] = useAuthentication()
  const [loading, setLoading] = useState(true)
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [isError, setError] = useState(false)

  const handleOnError = useCallback(
    err => {
      setLoading(false)
      setError(true)
      onError(err)
    },
    [setLoading, onError],
  )

  const handleOnChange = event => {
    onPhoneNumberChange(event.value)
  }

  const handleGetPhoneNumberSuccess = useCallback(
    response => {
      const retrievedNumbers = response
        .flatMap(r => r?.data?.incoming_phone_numbers)
        .filter(pn => pn?.capabilities?.sms)
        .map(pn => pn?.phone_number)
        .sort()
      setPhoneNumbers(retrievedNumbers)
      setLoading(false)
    },
    [setPhoneNumbers, setLoading],
  )

  const phoneNumberOptions = phoneNumbers.map(v => ({
    value: v,
    label: maskPhoneNumber(v),
  }))

  // Get available phone number on first render
  useEffect(() => {
    if (!isError) {
      getAllTwilioPhoneNumbers(authentication, 50).then(handleGetPhoneNumberSuccess).catch(handleOnError)
    }
  }, [isError, authentication, handleGetPhoneNumberSuccess, handleOnError])

  const placeHolderText = isError ? "Error loading phone number" : loading ? "Loading phone numbers..." : "Select (or type) a phone number..."
  return (
    <Select placeholder={placeHolderText} isLoading={loading} options={phoneNumberOptions} onChange={handleOnChange} />
  )
}

export default PhoneNumberSelector
