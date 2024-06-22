import DefaultLayout from "../DefaultLayout/DefaultLayout"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import { useGetTwilioService } from "../../hook/useGetTwilioService"
import { useCreateTwilioDocument } from "../../hook/useCreateTwilioDocument"

export const NotificationsPage = () => {
  const [authentication] = useAuthentication()
  const history = useHistory()
  const service = useGetTwilioService()
  const createDoc = useCreateTwilioDocument()

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push("/authentication")
    return null
  }

  const handleRun = async () => {
    const s = await service()
    console.log("cake", s)
    const d = await createDoc()
    console.log("dake", d)
  }

  return (
    <DefaultLayout>
      <h4>Notifications</h4>
      <button onClick={handleRun}>Sync Notifications</button>
    </DefaultLayout>
  )
}
