import axios from "axios"
import { Authentication, toCredentials } from "../context/AuthenticationProvider"

const sortByDate = (a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1)

/**
 * @param {Authentication} authentication
 * @param {string} phoneNumber
 * @returns
 */
export const getTwilioMessagesByPhoneNumber = async (authentication, phoneNumber) => {
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
  return []
    .concat(fromResult.data.messages)
    .concat(toResult.data.messages)
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
