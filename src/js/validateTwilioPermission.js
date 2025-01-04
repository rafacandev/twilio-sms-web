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
 */
export const validatePermission = async (authentication = new Authentication()) => {
  await axios.get(buildUrl(authentication.accountSid), {
    auth: toCredentials(authentication),
  })
}
