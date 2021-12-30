import axios from "axios";
import {toCredentials, useAuthentication} from "../context/AuthenticationProvider";

const useGetTwilioPhoneNumbers = ({onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {

  const [authentication] = useAuthentication()
  const credentials = toCredentials(authentication)

  const getPhoneNumbers = () => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/IncomingPhoneNumbers.json?Beta=false`
    axios.get(url,
      {
        auth: credentials
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return getPhoneNumbers
}

export default useGetTwilioPhoneNumbers
