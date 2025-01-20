import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { getTwilioPhoneNumbers } from "../../js/getTwilioPhoneNumbers"
import { sendTwilioMessage } from "../../js/sendTwilioMessage"
import { phonePattern } from "../../js/util"
import { Layout } from "../Layout/Layout"
import { PhoneCombobox } from "../PhoneCombobox/PhoneComboox"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { Loading3QuartersOutlined } from "@ant-design/icons"

export const SendPage = () => {
  const { from: fromParam, to: toParam } = useParams()
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [from, setFrom] = useState(fromParam ?? "")
  const [to, setTo] = useState(toParam ?? "")
  const [message, setMessage] = useState("")
  const [loadingPhoneNumbers, setLoadingPhoneNumbers] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [error, setError] = useState(null)
  const [authentication] = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    getTwilioPhoneNumbers()
      .then(setPhoneNumbers)
      .catch(setError)
      .finally(() => setLoadingPhoneNumbers(false))
  }, [])

  const handleToOnChange = e => {
    const val = e.target.value
    setTo("+" + val.replace(/\D/g, ""))
  }

  const handleSend = () => {
    if (sendingMessage) return

    setSendingMessage(true)
    sendTwilioMessage(authentication, to, from, message)
      .catch(setError)
      .then(messageSid => navigate(`/sent/${messageSid}`))
      .finally(() => setSendingMessage(false))
  }

  const isValid = () => {
    const isValidFrom = phoneNumbers.includes(from)
    const isValidTo = to.match(phonePattern) !== null
    const isValidMessage = message.length > 0 && message.length < 500
    return !sendingMessage && isValidFrom && isValidTo && isValidMessage
  }

  const hint = `Send a message from  ${from === "" ? "?" : from}  to  ${to === "" ? "?" : to}`

  return (
    <Layout>
      <h3>Send</h3>
      <p className="my-4">Select phone number to send a message from.</p>
      <ErrorLabel error={error} className="mb-4" />
      <div className="flex items-center">
        <label className="w-14">From:</label>
        <PhoneCombobox
          initial={from}
          options={phoneNumbers}
          onSelect={setFrom}
          loading={loadingPhoneNumbers}
          disabled={sendingMessage}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="w-14">To:</label>
        <input type="tel" value={to} pattern={phonePattern} onChange={handleToOnChange} disabled={sendingMessage} />
      </div>
      <textarea
        className="w-full mt-2 p-2"
        placeholder={hint}
        onChange={i => setMessage(i.target.value)}
        minLength="1"
        maxLength="500"
        disabled={sendingMessage}
        rows="5"
      ></textarea>
      <p className="text-xs font-thin m-0">Messages must be between 1 and 500 characters.</p>
      <button className="float-right" onClick={handleSend} disabled={!isValid()}>
        {!sendingMessage && "Send"}
        {sendingMessage && <Loading3QuartersOutlined spin="true" />}
      </button>
    </Layout>
  )
}
