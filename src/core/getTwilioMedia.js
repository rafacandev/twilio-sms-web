import axios from "axios"
import { getAuthentication, toCredentials } from "../context/AuthenticationProvider"

const cache = new Map()

export const getTwilioMedia = async messageSid => {
  const authentication = getAuthentication()
  if (cache.has(messageSid)) {
    return cache.get(messageSid)
  }

  let result = []
  const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages/${messageSid}/Media.json`
  const response = await axios.get(url, {
    auth: toCredentials(authentication),
  })
  if (response?.data?.media_list?.length > 0) {
    result = response.data.media_list.map(m => {
      const suffix = m.uri.substring(0, m.uri.indexOf(".json"))
      return `https://api.twilio.com/${suffix}`
    })
  }
  cache.set(messageSid, result)
  return result
}
