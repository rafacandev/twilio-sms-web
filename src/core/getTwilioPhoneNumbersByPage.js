import { buildUrl } from "./getTwilioPhoneNumbers"
import { Authentication, toCredentials } from "../context/AuthenticationProvider"
import axios from "axios"

/**
 * @typedef {import("./getTwilioPhoneNumbers").TwilioPhoneNumberResponse} TwilioPhoneNumberResponse
 * @returns {Promise<TwilioPhoneNumberResponse>}
 */
export const getTwilioPhoneNumbersByPage = async (
  authentication = new Authentication(),
  pageSize = 50,
  pageNumber = 0,
) => {
  return axios.get(buildUrl(authentication.accountSid, pageSize, pageNumber), {
    auth: toCredentials(authentication),
  })
}
