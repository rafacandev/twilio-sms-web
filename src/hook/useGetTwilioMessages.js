import axios from "axios";
import { toCredentials, useAuthentication } from "../context/AuthenticationProvider";

const sortByDate = (a, b) => Date.parse(a.date_created) > Date.parse(b.date_created) ? -1 : 1

export const useGetTwilioMessages = () => {

  const [authentication] = useAuthentication()
  const credentials = toCredentials(authentication)

  const request = async ({ phoneNumber }) => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
    const fromResult = await axios.get(url,
      {
        auth: credentials,
        params: { From: phoneNumber }
      })
    const toResult = await axios.get(url,
      {
        auth: credentials,
        params: { To: phoneNumber }
      })
    const result = []
      .concat(fromResult.data.messages)
      .concat(toResult.data.messages)
    return result.sort(sortByDate)
  }

  return request
}
