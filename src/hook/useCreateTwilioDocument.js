import axios from "axios"
import { isAxiosError } from "axios"
import { toCredentials, useAuthentication } from "../context/AuthenticationProvider"
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

export const useGetOrCreateTwilioDocument = () => {
  const [authentication] = useAuthentication()
  return async () => {
    const service = await getOrCreateService(authentication)
    return getOrCreateDocument(authentication, service.sid)
  }
}
