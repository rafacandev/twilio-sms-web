import axios from "axios"
import { toCredentials, useAuthentication } from "../context/AuthenticationProvider"

const TWILIO_SMS_WEB = "twilio_sms_web"

const createService = authentication => {
  const data = new URLSearchParams()
  data.append("FriendlyName", TWILIO_SMS_WEB)
  return axios.post("https://sync.twilio.com/v1/Services", data, {
    auth: toCredentials(authentication),
  })
}

let serviceCache = undefined
const getService = async authentication => {
  if (serviceCache) {
    return serviceCache
  }
  const services = await axios.get("https://sync.twilio.com/v1/Services?PageSize=50", {
    auth: toCredentials(authentication),
  })
  serviceCache = services.data.services.filter(s => s.friendly_name === "twilio_sms_web")[0]
  return serviceCache
}

export const getOrCreate = authentication => getService(authentication) ?? createService(authentication)

/**
 * @typedef {Object} TwilioService
 * @property {string} friendly_name - The string that you assigned to describe the resource.
 * @property {string} account_sid - The SID of the Account that created the Service resource.
 * @property {string} sid - The unique string that we created to identify the Service resource.
 */

/**
 * @returns {Promise<TwilioService>} - Twilio Service for sync API
 */
export const useGetTwilioService = () => {
  const [authentication] = useAuthentication()
  return () => getOrCreate(authentication)
}
