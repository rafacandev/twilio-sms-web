import Select from "react-select"
import { useState } from "react"
import "./PhoneNumberSelector.css"
import { useGetAllPhoneNumbers } from "../../hook/usetGetTwilioPhoneNumbers"

// TODO: Currently, this mask is limited to country code +1; we need a mask for all country codes
const maskPhoneNumber = v => {
  let result = v.substr(0, 2)
  result += " " + v.substr(2, 3)
  result += " " + v.substr(5, 3)
  result += " " + v.substr(8)
  return result
}

const PhoneNumberSelector = ({ onError = () => {}, onPhoneNumberChange = () => {} }) => {
  const [loading, setLoading] = useState(true)
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [isError, setError] = useState(false)
  const getPhones = useGetAllPhoneNumbers()

  const handleOnError = err => {
    setError(true)
    onError(err)
    setLoading(false)
  }

  const handleOnChange = event => {
    onPhoneNumberChange(event.value)
  }

  const handleLoadPhoneNumbers = pn => {
    setPhoneNumbers(pn)
    setLoading(false)
  }

  getPhones().then(handleLoadPhoneNumbers).catch(handleOnError)

  const phoneNumberOptions = phoneNumbers.map(v => ({
    value: v,
    label: maskPhoneNumber(v),
  }))

  const placeHolderText = isError
    ? "Error loading phone number"
    : loading
      ? "Loading phone numbers..."
      : "Select (or type) a phone number..."
  return (
    <Select placeholder={placeHolderText} isLoading={loading} options={phoneNumberOptions} onChange={handleOnChange} />
  )
}

export default PhoneNumberSelector
