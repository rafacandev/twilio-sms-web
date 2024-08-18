import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { getTwilioMessages } from "../../js/getTwilioMessages"
import { MessageRows } from "../MessageRows/MessageRows"
import { MessageFilterOption, Selector } from "./Selector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"

export const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [loading, setLoading] = useState(true)
  const [messageFilter, setMessageFilter] = useState(MessageFilterOption.all)

  useEffect(() => {
    getTwilioMessages().then(setMessages)
    getTwilioPhoneNumbers()
      .then(setPhoneNumbers)
      .then(() => setLoading(false))
  }, [])

  console.log("messageFilter", messageFilter)

  return (
    <DockedLayout>
      <h3>Inbox</h3>
      <p className="text-xs italic">Your most recent incoming messages</p>
      <Selector
        className="mb-1"
        phoneNumbers={phoneNumbers}
        loading={loading}
        onMessageFilterChange={setMessageFilter}
      />
      <MessageRows messages={messages} />
    </DockedLayout>
  )
}
