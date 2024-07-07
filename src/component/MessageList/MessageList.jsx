import { useEffect, useState } from "react"
import { Loading } from "./MessageListView"
import { MessageCard } from "../MessageCard/MessageCard"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { getTwilioMessagesByPhoneNumber } from "../../js/getTwilioMessagesByPhoneNumber"

export const MessageList = ({
  phoneNumber = undefined,
  onActionClick = () => {},
  onComplete = () => {},
  onError = () => {},
}) => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [loadedPhoneNumber, setLoadedPhoneNumber] = useState(undefined)
  const [authentication] = useAuthentication()

  console.log({ phoneNumber })
  useEffect(() => {
    if (phoneNumber !== undefined && loadedPhoneNumber !== phoneNumber) {
      getTwilioMessagesByPhoneNumber(authentication, phoneNumber)
        .then(ms => {
          setLoadedPhoneNumber(phoneNumber)
          setMessages(ms)
          setLoading(false)
        })
        .catch(onError)
        .then(onComplete)
    }
  }, [loading, authentication, phoneNumber, loadedPhoneNumber, onError, onComplete, setLoading])

  if (loading) return <Loading className="h1 m-2" />

  return messages.map(v => (
    <MessageCard
      key={v.messageSid}
      messageSid={v.messageSid}
      from={v.from}
      to={v.to}
      body={v.body}
      direction={v.direction}
      status={v.status}
      date={v.date}
      onActionClick={onActionClick}
    />
  ))
}
