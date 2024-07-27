import { buildUrl } from "./getTwilioPhoneNumbers"
import { Authentication, toCredentials } from "../context/AuthenticationProvider"
import axios from "axios"

/**
 * We want to get phone numbers after sign-in because at minimum we want to know
 * if the Authentication have permissions for it before moving forward
 *
 * TODO: Get a list of permissions from Twilio and controll what the user may or may not do.
 *
 * @param {Authentication} authentication
 * @param {number} pageSize
 * @param {number} pageNumber
 * @returns
 */
export const hasPermissions = async (authentication = new Authentication(), pageSize = 1, pageNumber = 0) => {
  return axios
    .get(buildUrl(authentication.accountSid, pageSize, pageNumber), {
      auth: toCredentials(authentication),
    })
    .then(() => true)
}
