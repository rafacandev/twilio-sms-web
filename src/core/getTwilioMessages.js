import axios from "axios"
import { getAuthentication, toCredentials } from "../context/AuthenticationProvider"

const sortByDate = (a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1)

/**
 * @typedef {Object} Message
 * @prop {string} messageSid
 * @prop {string} direction
 * @prop {string} from
 * @prop {string} to
 * @prop {string} status
 * @prop {string} body
 */

/**
 * @returns {Promise<Array<Message>>}
 */
export const getTwilioMessages = async () => {
  const authentication = getAuthentication()
  const credentials = toCredentials(authentication)
  const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
  const response = await axios.get(url, {
    auth: credentials,
  })

  return response.data.messages
    .map(v => ({
      messageSid: v.sid,
      direction: v.direction,
      from: v.from,
      to: v.to,
      date: v.date_created,
      status: v.status,
      body: v.body,
    }))
    .sort(sortByDate)
}
