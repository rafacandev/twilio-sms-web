import { DockedLayout } from "../DockedLayout/DockedLayout"
import { PhoneSelector } from "../PhoneSelector/PhoneSelector"

export const SendPage = () => {
  return (
    <DockedLayout>
      <h3>Send</h3>
      <p className="text-xs italic">Send a message to a phone number.</p>
      <PhoneSelector phoneNumbers={[]} />
    </DockedLayout>
  )
}
