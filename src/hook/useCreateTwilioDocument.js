import axios from "axios"
import { isAxiosError } from "axios"
import { getAuthentication, toCredentials } from "../context/AuthenticationProvider"
import { getOrCreateService } from "./useGetTwilioService"

const TWILIO_SMS_WEB = "twilio_sms_web"

const getDocument = (authentication, serviceSid) => {
  return axios.get(`https://sync.twilio.com/v1/Services/${serviceSid}/Documents/${TWILIO_SMS_WEB}`, {
    auth: toCredentials(authentication),
  })
}

const createDocument = (authentication, serviceSid) => {
  const data = new URLSearchParams()
  data.append("UniqueName", TWILIO_SMS_WEB)
  data.append("Data", "{}")
  return axios.post(`https://sync.twilio.com/v1/Services/${serviceSid}/Documents`, data, {
    auth: toCredentials(authentication),
  })
}

const getOrCreateDocument = async (authentication, serviceSid) => {
  try {
    const document = await getDocument(authentication, serviceSid)
    return document.data
  } catch (err) {
    if (isAxiosError(err) && err?.response?.status === 404) {
      const document = await createDocument(authentication, serviceSid)
      return document.data
    }
    throw err
  }
}

/**
 * A Sync Document is an object with these characteristics:
 * It's a single JSON object, up to 16KiB in size.
 * Its modification history is not maintained; however, documents are assigned a new revision number after each modification.
 * Its concurrency control is based on an 'eventual' model and it uses revision numbers for conditional updates.
 * It expires and is deleted automatically if its eviction is configured by setting the ttl parameter. By default, it is persisted permanently.
 * @typedef {Object} TwilioDocument
 * @property {string} account_sid - The account SID.
 * @property {string} created_by - The creator of the document.
 * @property {Object} data - The data contained in the document.
 * @property {string} date_expires - The expiration date of the document in ISO 8601 format.
 * @property {string} date_created - The creation date of the document in ISO 8601 format.
 * @property {string} date_updated - The last update date of the document in ISO 8601 format.
 * @property {string} revision - The revision of the document.
 * @property {string} service_sid - The service SID.
 * @property {string} sid - The SID of the document.
 * @property {string} unique_name - The unique name of the document.
 */

/**
 * @returns {Promise<TwilioDocument>}
 */
export const getOrCreateTwilioDocument = () => {
  const authentication = getAuthentication()
  return getOrCreateService(authentication).then(service => getOrCreateDocument(authentication, service.sid))
}
