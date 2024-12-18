import { useEffect, useState } from "react"
import { Layout } from "../Layout/Layout"
import { MessageRows } from "../MessageRows/MessageRows"
import { MessageFilterOption, Selector } from "./Selector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"
import { getMessages } from "./getMessages"

export const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [phoneNumber, setPhoneNumber] = useState("default")
  const [loading, setLoading] = useState(true)
  const [messageFilter, setMessageFilter] = useState(MessageFilterOption.all)

  useEffect(() => {
    getMessages(phoneNumber, messageFilter).then(setMessages)
  }, [phoneNumber, messageFilter])

  useEffect(() => {
    getTwilioPhoneNumbers()
      .then(setPhoneNumbers)
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h3>Inbox</h3>
      <p className="text-xs italic">Your most recent incoming messages</p>
      <Selector
        className="mb-1"
        phoneNumbers={phoneNumbers}
        phoneNumber={phoneNumber}
        loading={loading}
        onMessageFilterChange={setMessageFilter}
        onPhoneNumberChange={setPhoneNumber}
      />
      <MessageRows messages={messages} />
    </Layout>
  )
}
