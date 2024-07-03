import { buildUrl } from "./getTwilioPhoneNumbers"
import { Authentication, toCredentials } from "../context/AuthenticationProvider"
import { TwilioPhoneNumberResponse } from "./getTwilioPhoneNumbers"
import axios from "axios"

/**
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
