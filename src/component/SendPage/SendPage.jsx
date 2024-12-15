import { useEffect, useState } from "react"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { PhoneSelector } from "../PhoneSelector/PhoneSelector"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"

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
      <PhoneSelector phoneNumbers={phoneNumbers} phoneNumber={phoneNumber} onPhoneNumberChange={setPhoneNumber} loading={isPhoneNumberLoading} />
    </DockedLayout>
  )
}
