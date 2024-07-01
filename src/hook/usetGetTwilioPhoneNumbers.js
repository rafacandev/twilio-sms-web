import axios from "axios"
import { Authentication, toCredentials } from "../context/AuthenticationProvider"

const buildUrl = (accountSid = "", pageSize = 8, pageNumber = 0) =>
  `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json?Beta=false&PageSize=${pageSize}&Page=${pageNumber}`

/**
 * @returns {Promise<TwilioPhoneNumberResponse>}
 */
export const getTwilioPhoneNumbers = async (authentication = new Authentication(), pageSize = 50, pageNumber = 0) => {
  return axios.get(buildUrl(authentication.accountSid, pageSize, pageNumber), {
    auth: toCredentials(authentication),
  })
}