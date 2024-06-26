import { DefaultLayout } from "../DefaultLayout/DefaultLayout"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import { useGetOrCreateTwilioDocument } from "../../hook/useCreateTwilioDocument"

export const NotificationsPage = () => {
  const [authentication] = useAuthentication()
  const history = useHistory()
  const getOrCreateDoc = useGetOrCreateTwilioDocument()

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push("/authentication")
    return null
  }

  const handleRun = async () => {
    const d = await getOrCreateDoc()
    console.log("Twilio Document", d)
  }

  return (
    <DefaultLayout>
      <h4>Notifications</h4>
      <button onClick={handleRun}>Sync Notifications</button>
    </DefaultLayout>
  )
}
