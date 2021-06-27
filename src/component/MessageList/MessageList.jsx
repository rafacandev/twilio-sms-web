import {useEffect, useState} from "react";
import useGetTwilioMessages from "../../hook/useGetTwilioMessages";
import "./MessageList.css";
import {LoadingOutlined} from "@ant-design/icons";

const Loading = () => <>
  <div className="text-center message-list-loading-container">
    <LoadingOutlined className="message-list-loading text-primary" />
  </div>
</>

const MessageList = ({phoneNumber = '', onComplete = () => {}, onError = () => {}}) => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [hasMounted, setHasMounted] = useState(false)
  const [previousPhoneNumber, setPreviousPhoneNumber] = useState(null);

  const handleSuccess = (response) => {
    const messagesMapped = response?.data?.messages
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
  }

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
      getMessages({from: phoneNumber})
      setPreviousPhoneNumber(phoneNumber)
      setLoading(true)
    }
  }, [messages, hasMounted, getMessages, previousPhoneNumber, phoneNumber, setLoading])

  const MessagePanel = ({message}) => (
    <div className="panel message-list-panel">
      <div className="panel-header text-small">
        <div className="message-list-header">
          <div><strong>from:</strong> {message.from}</div>
          <div><strong>To:</strong> {message.to}</div>
          <div><strong>Direction:</strong> {message.direction}</div>
          <div><strong>Status:</strong> {message.status}</div>
        </div>
      </div>
      <div className="panel-body text-code">
        {message.body}
      </div>
      <div className="panel-footer text-small text-gray">
        Date: {new Date(message.date)?.toLocaleString()}
      </div>
    </div>
  )

  if (loading) return <Loading/>

  return messages.map(v => <MessagePanel key={v.messageSid}  message={v}/> )
}

export default MessageList