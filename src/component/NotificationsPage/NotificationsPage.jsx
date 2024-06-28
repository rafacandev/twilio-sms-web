import { DefaultLayout } from "../DefaultLayout/DefaultLayout"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { useGetOrCreateTwilioDocument } from "../../hook/useCreateTwilioDocument"
import { useEffect, useState } from "react"
import { getTwilioMessages } from "../../core/getTwilioMessages"
import { MessageCard } from "../MessageCard/MessageCard"

/**
 * @typedef {import ("../../core/getTwilioMessages").Message} Message
 */

/**
 * @param {{messages: Array<Message>}} messages
 */
const MessageList = ({ messages = [] }) =>
  messages.map(m => (
    <MessageCard
      body={m.body}
      date={m.date}
      direction={m.direction}
      from={m.from}
      key={m.messageSid}
      messageSid={m.messageSid}
      status={m.status}
      to={m.to}
    />
  ))

export const NotificationsPage = () => {
  const [authentication] = useAuthentication()
  const getOrCreateDoc = useGetOrCreateTwilioDocument()
  const [messages, setMessages] = useState([])

  const handleRun = async () => {
    const d = await getOrCreateDoc()
    console.log("Twilio Document", d)
  }

  useEffect(() => {
    getTwilioMessages(authentication).then(setMessages)
  }, [authentication])

  return (
    <DefaultLayout>
      <h4>Notifications</h4>
      <button onClick={handleRun}>Sync Notifications</button>
      <MessageList messages={messages} />
    </DefaultLayout>
  )
}
