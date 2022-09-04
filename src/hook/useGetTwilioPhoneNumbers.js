import axios from "axios";
import { Authentication, toCredentials } from "../context/AuthenticationProvider";

const useGetTwilioPhoneNumbers = ({
  onSuccess = () => { },
  onError = () => { } }) => {

  return (authentication = new Authentication()) => {
    const credentials = toCredentials(authentication)
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/IncomingPhoneNumbers.json?Beta=false`
    axios.get(url,
      {
        auth: credentials
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
  }

}

export default useGetTwilioPhoneNumbers
