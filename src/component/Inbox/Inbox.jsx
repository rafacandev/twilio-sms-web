import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { getTwilioMessages } from "../../js/getTwilioMessages"
import { MessageRows } from "../MessageRows/MessageRows"
import { Selector } from "./Selector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"

export const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])

  useEffect(() => {
    getTwilioMessages().then(setMessages)
    getTwilioPhoneNumbers().then(setPhoneNumbers)
  }, [])

  return (
    <DockedLayout>
      <h3>Inbox</h3>
      <p className="text-xs italic">Your most recent incoming messages</p>
      <Selector phoneNumbers={phoneNumbers}></Selector>
      <MessageRows messages={messages} />
    </DockedLayout>
  )
}
