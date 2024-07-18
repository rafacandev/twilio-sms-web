import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { getTwilioMessages } from "../../js/getTwilioMessagesByPhoneNumber"
import { MessageRows } from "../MessageRows/MessageRows"

export const MailBox = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getTwilioMessages().then(setMessages)
  }, [])

  return (
    <DockedLayout>
      <h3>Inbox</h3>
      <p className="text-xs italic">Your most recent incoming messages</p>
      <MessageRows messages={messages} />
    </DockedLayout>
  )
}
