import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { PhoneSelector } from "../PhoneSelector/PhoneSelector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"

const messageValidationPattern = "[\\w\\d]{3,}"

export const SendPage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [phoneNumber, setPhoneNumber] = useState("default")
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
      <PhoneSelector
        phoneNumbers={phoneNumbers}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={setPhoneNumber}
        loading={isPhoneNumberLoading}
      />
      <p className="mb-1 mt-4">
        Sending a message to <b>{phoneNumber}</b>
      </p>
      <textarea
        className="w-full bg-white border-2 rounded p-2 border-violet-200 invalid:border-red-500"
        placeholder={`Send a message to ${phoneNumber}`}
        required
        minLength="3"
        maxLength="500"
        rows="5"
      ></textarea>
      <p className="text-xs text-right font-thin">Messages must be between 3 and 500 characters.</p>
    </DockedLayout>
  )
}
