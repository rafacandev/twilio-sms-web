import { useEffect, useState } from "react"
import { Layout } from "../Layout/Layout"
import { MessageRows } from "../MessageRows/MessageRows"
import { allPhones, MessageFilterEnum, Selector } from "./Selector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"
import { getMessages } from "./getMessages"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"

export const InboxPage = () => {
  const [messages, setMessages] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [phoneNumber, setPhoneNumber] = useState(allPhones)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [loadingPhones, setLoadingPhones] = useState(true)
  const [messageFilter, setMessageFilter] = useState(MessageFilterEnum.all)
  const [error, setError] = useState(null)

  useEffect(() => {
    const run = async () => {
      setLoadingMessages(true)
      try {
        const ms = await getMessages(phoneNumber, messageFilter)
        setMessages(ms)
      } catch (e) {
        setError(e)
      } finally {
        setLoadingMessages(false)
      }
    }
    run()
  }, [phoneNumber, messageFilter])

  useEffect(() => {
    getTwilioPhoneNumbers()
      .then(setPhoneNumbers)
      .catch(setError)
      .finally(() => setLoadingPhones(false))
  }, [])

  return (
    <Layout>
      <h3>Inbox</h3>
      <p className="my-4">Your messages are displayed on this page, with the most recent ones at the top.</p>
      <ErrorLabel error={error} className="mb-4" />
      <Selector
        phoneNumbers={phoneNumbers}
        phoneNumber={phoneNumber}
        loading={loadingPhones}
        onMessageFilterChange={setMessageFilter}
        onPhoneNumberChange={setPhoneNumber}
      />
      <MessageRows loading={loadingMessages} messages={messages} />
    </Layout>
  )
}
