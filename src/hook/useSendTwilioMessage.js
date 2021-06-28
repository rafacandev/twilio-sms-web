import axios from "axios";
import {useAuthentication} from "../context/AuthenticationProvider";

const useSendTwilioMessage = ({ onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {

  const [authentication] = useAuthentication()

  const request = ({to, from, body}) => {
    const data = new URLSearchParams()
    data.append('To', to)
    data.append('From', from)
    data.append('Body', body)

    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
    axios.post(url, data , {
        auth: {
          username: authentication.accountSid,
          password: authentication.authToken
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return request
}

export default useSendTwilioMessage