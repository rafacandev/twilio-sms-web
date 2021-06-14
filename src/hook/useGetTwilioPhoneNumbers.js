import axios from "axios";
import {useAuthentication} from "../context/AuthenticationProvider";

const useGetTwilioPhoneNumbers = ({onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {

  const [authentication] = useAuthentication()

  const getPhoneNumbers = () => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/IncomingPhoneNumbers.json?Beta=false`
    axios.get(url,
      {
        auth: { username: authentication.accountSid, password: authentication.authToken }
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return getPhoneNumbers
}

export default useGetTwilioPhoneNumbers