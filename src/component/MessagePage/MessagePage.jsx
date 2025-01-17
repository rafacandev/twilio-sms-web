import { useEffect, useState } from "react"
import { Layout } from "../Layout/Layout"
import { getTwilioMessage } from "../../js/getTwilioMessages"
import { useNavigate, useParams } from "react-router-dom"
import { MessageInfo } from "../MessageInfo/MessageInfo"
import { LoadingOutlined } from "@ant-design/icons"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"

/**
 * @typedef {import("../../js/types").Message} Message
 */

/**
 *
 * @param {Object} props
 * @param {Message} props.message
 */
const MessagePanel = ({ message }) => {
  const navigate = useNavigate()
  const isReceived = message.direction === "received"
  const isSent = message.direction === "sent"
  return (
    <>
      <MessageInfo message={message} />
      <div className="mt-4 text-right space-x-4">
        <button onClick={() => navigate(`/conversation/${message.from}/${message.to}`)}>See Conversation</button>
        {isReceived && <button onClick={() => navigate(`/send/${message.to}/${message.from}`)}>Reply</button>}
        {isSent && <button onClick={() => navigate(`/send/${message.from}/${message.to}`)}>New Message</button>}
      </div>
    </>
  )
}

export const MessagePage = () => {
  const { messageSid } = useParams()
  const [message, setMessage] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTwilioMessage(messageSid)
      .then(setMessage)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [setMessage])

  return (
    <Layout>
      <h3>Message</h3>
      <ErrorLabel error={error} />
      <p className="my-4">More details for your message.</p>
      {loading && (
        <p className="mt-10 text-purple-900 text-5xl text-center">
          <LoadingOutlined />
        </p>
      )}
      {!loading && <MessagePanel message={message} />}
    </Layout>
  )
}
