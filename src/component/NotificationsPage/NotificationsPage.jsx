import { DefaultLayout } from "../DefaultLayout/DefaultLayout"
import { getOrCreateTwilioDocument } from "../../js/getOrCreateTwilioDocument"
import { useEffect, useState } from "react"
import { getTwilioMessages } from "../../js/getTwilioMessages"
import { MessageCard } from "../MessageCard/MessageCard"

/**
 * @typedef {import ("../../js/getTwilioMessages").Message} Message
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
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const initDocument = async () => {
      const document = await getOrCreateTwilioDocument()
      const msg = await getTwilioMessages()
      setMessages(msg)
      console.log("Twilio document and messages", document, msg)
    }
    initDocument()
  }, [setMessages])

  return (
    <DefaultLayout>
      <h4>Notifications</h4>
      <MessageList messages={messages} />
    </DefaultLayout>
  )
}
