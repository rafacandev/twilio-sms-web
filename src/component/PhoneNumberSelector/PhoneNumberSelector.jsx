import {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import useGetTwilioPhoneNumbers from "../../hook/useGetTwilioPhoneNumbers";
import "./PhoneNumberSelector.css"

const Loading = () => <>
  <div className="text-center loading-phone-number-container">
    <LoadingOutlined
      className="text-primary loading-phone-number"/>
  </div>
</>

const PhoneNumberSelector = ({ onError = () => {},
                               onComplete = () => {},
                               onPhoneNumberChange = () => {}}) => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumbers, setPhoneNumbers] = useState([])

  const handleOnComplete = () => {
    setLoading(false)
    onComplete()
  }

  const handleOnChange = (event) => {
    setPhoneNumber(event.target.value)
    onPhoneNumberChange(event.target.value)
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

  useEffect(() => {
    if (phoneNumbers.length === 0) {
      getPhoneNumbers()
    }
  }, [getPhoneNumbers, phoneNumbers])

  const Content = () => <>
    <div className="phone-number-container">
      <div className="text-center phone-number-label">
        Phone numbers:
      </div>
      <div className="form-group">
        <div>
          <select
            className="form-select phone-number-select"
            size="5"
            value={phoneNumber}
            onChange={handleOnChange}>
            <option value="" hidden>Select a phone number</option>
            {phoneNumbers.map(ph => <option key={ph}>{ph}</option>)}
          </select>
          <div className="text-small text-center">Total: {phoneNumbers.length}</div>
        </div>
      </div>
    </div>
  </>

  return <>
    {loading && <Loading/>}
    {!loading && <Content/>}
  </>
}

export default PhoneNumberSelector