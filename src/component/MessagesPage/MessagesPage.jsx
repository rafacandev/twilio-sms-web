import { useState } from "react"
import { Tabs } from "./MessagesPageView"
import { DefaultLayout } from "../DefaultLayout/DefaultLayout"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { PhoneNumberSelector } from "../PhoneNumberSelector/PhoneNumberSelector"

export const MessagesPage = () => {
  const [error, setError] = useState(undefined)
  const [phoneNumber, setPhoneNumber] = useState(undefined)
  const isPhoneNumberSelected = phoneNumber !== undefined

  return (
    <DefaultLayout>
      <h4>Messages</h4>
      <ErrorLabel error={error} />
      <PhoneNumberSelector onError={setError} onPhoneNumberChange={setPhoneNumber} />
      {isPhoneNumberSelected && <Tabs phoneNumber={phoneNumber} />}
    </DefaultLayout>
  )
}
