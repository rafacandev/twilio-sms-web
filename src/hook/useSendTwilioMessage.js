import axios from "axios";
import {toCredentials, useAuthentication} from "../context/AuthenticationProvider";

export const useSendTwilioMessage = ({ onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {

  const [authentication] = useAuthentication()
  const credentials = toCredentials(authentication)

  const request = ({to, from, body}) => {
    const data = new URLSearchParams()
    data.append('To', to)
    data.append('From', from)
    data.append('Body', body)

    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
    axios.post(url, data , {
        auth: credentials,
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
