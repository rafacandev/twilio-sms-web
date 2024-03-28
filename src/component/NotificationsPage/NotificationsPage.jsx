import DefaultLayout from '../DefaultLayout/DefaultLayout'
import { useAuthentication } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import axios from "axios";
import { Authentication, toCredentials } from "../../context/AuthenticationProvider"

export const NotificationsPage = () => {
  const [authentication] = useAuthentication()
  const history = useHistory()

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push('/authentication')
    return null
  }

  const handleRun = async () => {
    const resp = await axios.get('https://sync.twilio.com/v1/Services?PageSize=20', { auth: toCredentials(authentication) })
    const twilioSmsWebService = resp.data.services.filter(s => s.friendly_name === 'twilio_sms_web')[0]
    console.log(`Searched twilio_sms_web service: ${twilioSmsWebService}`)
    if (!twilioSmsWebService) {
      console.log('Did not find twilio_sms_web service, creating one...')
      const data = new URLSearchParams()
      data.append('FriendlyName', 'twilio_sms_web')
      await axios.post('https://sync.twilio.com/v1/Services', data, { auth: toCredentials(authentication) })  
    }
    console.log('Services', twilioSmsWebService, resp.data.services)
  }

  return <DefaultLayout>
    <h4>Notifications</h4>
    <button onClick={handleRun}>Sync Notifications</button>
  </DefaultLayout>
}