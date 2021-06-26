import axios from "axios";
import {useAuthentication} from "../context/AuthenticationProvider";

const useGetTwilioMessages = ({ onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {

  const [authentication] = useAuthentication()

  const request = ({from}) => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
    axios.get(url,
      {
        auth: { username: authentication.accountSid, password: authentication.authToken },
        params: {From: from}
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return request
}

export default useGetTwilioMessages