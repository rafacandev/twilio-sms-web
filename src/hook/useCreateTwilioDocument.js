import axios from "axios"
import { toCredentials, useAuthentication } from "../context/AuthenticationProvider"
import { getOrCreate } from "./useGetTwilioService"

const TWILIO_SMS_WEB = "twilio_sms_web"

const createDocument = (authentication, serviceSid) => {
  const data = new URLSearchParams()
  data.append("unique_name", TWILIO_SMS_WEB)
  data.append("data", {
    phoneNumber: "+1200000",
    lastMessage: "myLastMessage",
  })
  return axios.post(`https://sync.twilio.com/v1/Services/${serviceSid}/Documents`, data, {
    auth: toCredentials(authentication),
  })
}

export const useCreateTwilioDocument = () => {
  const [authentication] = useAuthentication()
  return async () => {
    const service = await getOrCreate(authentication)
    return createDocument(authentication, service.sid)
  }
}
