import { useParams } from "react-router-dom"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { useEffect, useState } from "react"
import { getTwilioMessages, sortByDate } from "../../js/getTwilioMessages"
import { MessageRows } from "../MessageRows/MessageRows"

export const ConversationPage = () => {
  const { from, to } = useParams()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const ft = getTwilioMessages(from, to)
    const tf = getTwilioMessages(to, from)
    Promise.all([ft, tf]).then(msg => setMessages(msg.flat().sort(sortByDate)))
  }, [from, to])

  return (
    <DockedLayout>
      <h3>Conversation</h3>
      <p className="text-xs">
        Messages exchanged between <span className="font-semibold">{from}</span> and{" "}
        <span className="font-semibold">{to}</span>
      </p>
      <MessageRows messages={messages} />
    </DockedLayout>
  )
}
