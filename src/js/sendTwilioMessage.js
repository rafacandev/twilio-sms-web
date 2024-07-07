import axios from "axios"
import { toCredentials, Authentication } from "../context/AuthenticationProvider"

export const sendTwilioMessage = (authentication = new Authentication(), to = "", from = "", body = "") => {
  const credentials = toCredentials(authentication)

  const data = new URLSearchParams()
  data.append("To", to)
  data.append("From", from)
  data.append("Body", body)

  const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
  axios.post(url, data, {
    auth: credentials,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return Promise.resolve("sent")
}
