import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { getTwilioPhoneNumbersMock } from "../../js/getTwilioPhoneNumbers"
import { getTwilioMessagesByPhoneNumberMock } from "../../js/getTwilioMessagesByPhoneNumber"

/**
 * @typedef {import (../js/types).Message} Message
 */

/**
 * @param {Message} message
 */
const MessageRow = message => (
  <div className="flex h-12 items-center bg-gray-200 hover:cursor-pointer hover:bg-slate-300">
    <div className="w-44">{message.from}</div>
    <div className="w-[2px] mx-2 bg-gray-300 h-12"></div>
    <div className="truncate">{message.body}</div>
  </div>
)

/**
 * @param {{messages: Array<Message>}} messages
 */
const MessageRows = ({ messages }) => (
  <div key={Math.random()} class="divide-solid divide-y-2 divide-gray-300 border-2 border-gray-300">
    <div className="flex h-12 items-center">
      <div className="w-40">From</div>
      <div className="w-[2px] mx-2 bg-gray-300 h-12"></div>
      <div className="grow">Message</div>
    </div>
    {messages.map(m => MessageRow(m))}
  </div>
)

export const MailBox = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getTwilioPhoneNumbersMock()
      .then(p => getTwilioMessagesByPhoneNumberMock(p))
      .then(setMessages)
  }, [])

  return (
    <DockedLayout>
      <h3>Inbox</h3>
      <p className="text-xs italic">Your most recent incoming messages</p>
      <MessageRows messages={messages} />
    </DockedLayout>
  )
}
