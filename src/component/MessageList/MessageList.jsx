import {useCallback, useEffect, useState} from "react";
import useGetTwilioMessages from "../../hook/useGetTwilioMessages";
import "./MessageList.css";
import {Loading, MessagePanel} from "./MessageListView";

const MessageList = ({phoneNumber = '', onComplete = () => {}, onError = () => {}}) => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [hasMounted, setHasMounted] = useState(false)
  const [previousPhoneNumber, setPreviousPhoneNumber] = useState(null);

  const handleSuccess = useCallback((response) => {
    const messagesMapped = response
      .map(v => ({
        messageSid: v.sid,
        direction: v.direction,
        from: v.from,
        to: v.to,
        date: v.date_created,
        status: v.status,
        body: v.body
      }))
    setMessages(messagesMapped)
    setLoading(false)
  }, [setMessages, setLoading])

  const getMessages = useGetTwilioMessages({
    onSuccess: handleSuccess,
    onComplete: onComplete,
    onError: onError
  })

  useEffect(() => {
    setHasMounted(true)
  }, [setHasMounted])

  useEffect(() => {
    if (hasMounted && (phoneNumber?.length > 0 && previousPhoneNumber !== phoneNumber)) {
      getMessages({phoneNumber: phoneNumber}).then(handleSuccess).catch(onError).then(onComplete)
      setPreviousPhoneNumber(phoneNumber)
      setLoading(true)
    }
  }, [hasMounted, phoneNumber, previousPhoneNumber, getMessages, messages, handleSuccess, onError, onComplete, setPreviousPhoneNumber, setLoading])

  if (loading) return <Loading/>

  return messages.map(v => <MessagePanel key={v.messageSid}  message={v}/> )
}

export default MessageList