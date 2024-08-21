import axios from "axios"
import { getAuthentication, toCredentials } from "../context/AuthenticationProvider"

/**
 * @typedef {import('./types').Message} Message
 */

const toMessage = (v = {}) => ({
  messageSid: v.sid,
  direction: v.direction,
  from: v.from,
  to: v.to,
  date: v.date_created,
  status: v.status,
  body: v.body,
})

const sortByDate = (a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1)

/**
 * @param {string} phoneNumber
 * @returns {Array<Message>}
 */
export const getTwilioMessagesByPhoneNumber = async phoneNumber => {
  const authentication = getAuthentication()
  const credentials = toCredentials(authentication)
  const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
  const fromResult = await axios.get(url, {
    auth: credentials,
    params: { From: phoneNumber },
  })
  const toResult = await axios.get(url, {
    auth: credentials,
    params: { To: phoneNumber },
  })
  return [].concat(fromResult.data.messages).concat(toResult.data.messages).map(toMessage).sort(sortByDate)
}

/**
 * @returns {Promise<Array<Message>>}
 */
export const getTwilioMessages = async (from = "", to = "") => {
  const authentication = getAuthentication()
  const credentials = toCredentials(authentication)
  const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`

  const params = {}
  if (to.length > 0) {
    params.To = to
  }

  if (from.length > 0) {
    params.From = from
  }

  const response = await axios.get(url, {
    auth: credentials,
    params,
  })

  return response.data.messages.map(toMessage).sort(sortByDate)
}
