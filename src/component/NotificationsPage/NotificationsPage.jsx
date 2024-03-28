import DefaultLayout from '../DefaultLayout/DefaultLayout'
import { useAuthentication } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import axios from "axios";
import { Authentication, toCredentials } from "../../context/AuthenticationProvider";

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
    console.log('Services', resp)
  }

  return <DefaultLayout>
    <h4>Notifications</h4>
    <button onClick={handleRun}>Sync Notifications</button>
  </DefaultLayout>
}