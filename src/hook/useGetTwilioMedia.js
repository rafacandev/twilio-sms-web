import axios from "axios"
import { toCredentials, useAuthentication } from "../context/AuthenticationProvider"

const cash = new Map()

const useGetTwilioMedia = () => {
  const [authentication] = useAuthentication()
  const credentials = toCredentials(authentication)

  const request = async messageSid => {
    if (cash.has(messageSid)) {
      return cash.get(messageSid)
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages/${messageSid}/Media.json`
    const response = await axios
      .get(url, {
        auth: credentials,
      })
      .then(mediaResponse => {
        if (mediaResponse?.data?.media_list?.length > 0) {
          return mediaResponse.data.media_list.map(m => {
            return `https://api.twilio.com/${m.uri.substring(0, m.uri.indexOf(".json"))}`
          })
        } else {
          return []
        }
      })

    cash.set(messageSid, response)
    return response
  }

  return request
}

export default useGetTwilioMedia
