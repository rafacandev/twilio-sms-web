import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { PhoneSelector } from "../PhoneSelector/PhoneSelector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"

export const SendPage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [from, setFrom] = useState("default")
  const [to, setTo] = useState("")
  const [isPhoneNumberLoading, setPhoneNumbersLoading] = useState(true)

  useEffect(() => {
    getTwilioPhoneNumbers()
      .then(setPhoneNumbers)
      .then(() => setPhoneNumbersLoading(false))
  }, [])

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
          loading={isPhoneNumberLoading}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="w-10">To:</label>
        <input
          className="w-36 border-2 rounded p-1 border-violet-200 invalid:border-red-500 invalid:border-red"
          type="tel"
          pattern="[\+]\d{10}"
          onChange={i => setTo(i.target.value)}
        />
      </div>

      <p className="mb-1 mt-4">
        Sending a message from <b className="mx-1">{from}</b> to <b className="mx-1">{to}</b>
      </p>
      <textarea
        className="w-full border-2 rounded p-2 border-violet-200 invalid:border-red-500"
        placeholder={`Send a message from  ${from}  to  ${to}`}
        minLength="3"
        maxLength="500"
        rows="5"
      ></textarea>
      <p className="text-xs font-thin m-0">Messages must be between 3 and 500 characters.</p>
      <button className="border-2 rounded py-2 px-4 border-white invalid:border-red-500 bg-purple-900 text-white hover:bg-purple-700 active:bg-purple-950 float-right">
        Send
      </button>
    </DockedLayout>
  )
}
