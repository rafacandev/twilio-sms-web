import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { PhoneSelector } from "../PhoneSelector/PhoneSelector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"
import { sendTwilioMessage } from "../../js/sendTwilioMessage"
import { useAuthentication } from "../../context/AuthenticationProvider"

const Status = {
  loading: "loading",
  loaded: "loaded",
  sending: "sending",
  sent: "sent",
}

export const SendPage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [from, setFrom] = useState("default")
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
  }

  const isLoading = () => status === Status.loading || status === Status.sending

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

      <p className="mb-1 mt-4">
        Sending a message from <b className="mx-1">{from}</b> to <b className="mx-1">{to}</b>
      </p>
      <textarea
        className="w-full border-2 rounded p-2 border-violet-200 invalid:border-red-500"
        placeholder={`Send a message from  ${from}  to  ${to}`}
        onChange={i => setMessage(i.target.value)}
        minLength="3"
        maxLength="500"
        rows="5"
      ></textarea>
      <p className="text-xs font-thin m-0">Messages must be between 3 and 500 characters.</p>
      <button
        className="border-2 rounded py-2 px-4 border-white invalid:border-red-500 bg-purple-900 text-white hover:bg-purple-700 active:bg-purple-950 float-right"
        onClick={handleSend}
      >
        Send
      </button>
    </DockedLayout>
  )
}
