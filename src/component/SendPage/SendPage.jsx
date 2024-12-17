import { CheckCircleFilled } from "@ant-design/icons"

import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { PhoneSelector } from "../PhoneSelector/PhoneSelector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"
import { sendTwilioMessage } from "../../js/sendTwilioMessage"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { emptyFn } from "../../js/types"

const Status = {
  loading: "loading",
  loaded: "loaded",
  sending: "sending",
  sent: "sent",
}

const phoneMatch = "[+][0-9]{11}"

const Dialog = (from = "?", to = "?", close = emptyFn) => (
  <DockedLayout>
    <div className="flex max-h-[600px] h-full items-center">
      <dialog open className="p-6 border-2 rounded border-purple-800 bg-white text-center">
        <CheckCircleFilled className="text-green-200 text-5xl block mb-8" />
        <p>
          Message sent from <b>{from}</b> to <b>{to}</b>
        </p>
        <button
          className="border-2 rounded mt-2 py-2 px-4 border-white invalid:border-red-500 bg-purple-900 text-white hover:bg-purple-700 active:bg-purple-950 disabled:bg-gray-200 disabled:border-gray-300"
          onClick={close}
        >
          OK
        </button>
      </dialog>
    </div>
  </DockedLayout>
)

export const SendPage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [message, setMessage] = useState("")
  const [authentication] = useAuthentication()
  const [status, setStatus] = useState(Status.loading)

  useEffect(() => {
    getTwilioPhoneNumbers()
      .then(setPhoneNumbers)
      .then(() => setStatus(Status.loaded))
  }, [])

  const handleSend = () => {
    setStatus(Status.sending)
    sendTwilioMessage(authentication, to, from, message).then(() => setStatus(Status.sent))
    setStatus(Status.sent)
  }

  const isLoading = () => status === Status.loading || status === Status.sending

  const isValid = () => {
    const isValidFrom = from.match(phoneMatch) !== null
    const isValidTo = to.length > 0 && to.match(phoneMatch) !== null
    const isValidMessage = message.length >= 3
    return isValidFrom && isValidTo && isValidMessage
  }

  const hint = `Send a message from  ${from === "" ? "?" : from}  to  ${to === "" ? "?" : to}`

  if (status === Status.sent) {
    return Dialog(from, to, () => setStatus(Status.loaded))
  }

  return (
    <DockedLayout>
      <h3>Send</h3>
      <p className="text-xs italic">Send a message to a phone number.</p>
      <div className="flex items-center">
        <label className="w-10">From:</label>{" "}
        <PhoneSelector
          className="inline w-36"
          phoneNumbers={phoneNumbers}
          phoneNumber={from}
          onPhoneNumberChange={setFrom}
          includeAllOption={false}
          loading={isLoading()}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="w-10">To:</label>
        <input
          className="w-36 border-2 rounded p-1 border-violet-200 invalid:border-red-500 invalid:border-red"
          type="tel"
          pattern="[\+]\d{11}"
          onChange={i => setTo(i.target.value)}
        />
      </div>
      <textarea
        className="w-full border-2 rounded mt-2 p-2 border-violet-200 invalid:border-red-500"
        placeholder={hint}
        onChange={i => setMessage(i.target.value)}
        minLength="3"
        maxLength="500"
        rows="5"
      ></textarea>
      <p className="text-xs font-thin m-0">Messages must be between 3 and 500 characters.</p>
      <button
        className="border-2 rounded py-2 px-4 border-white invalid:border-red-500 bg-purple-900 text-white hover:bg-purple-700 active:bg-purple-950 float-right disabled:bg-gray-200 disabled:border-gray-300"
        onClick={handleSend}
        disabled={!isValid()}
      >
        Send
      </button>
    </DockedLayout>
  )
}
