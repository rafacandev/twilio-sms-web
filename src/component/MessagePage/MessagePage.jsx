import { useEffect, useState } from "react"
import { Layout } from "../Layout/Layout"
import { getTwilioMessage } from "../../js/getTwilioMessages"
import { useParams } from "react-router-dom"
import { MessageInfo } from "../MessageInfo/MessageInfo"
import { LoadingOutlined } from "@ant-design/icons"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { Link } from "react-router-dom"

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
      <p className="my-4">
        More details for your message. You may also view all &nbsp;
        <Link to={`/conversation/${message.from}/${message.to}`}>
          messages between {message.from} and {message.to}
        </Link>
      </p>
      {loading && (
        <p className="mt-10 text-purple-900 text-5xl text-center">
          <LoadingOutlined />
        </p>
      )}
      {!loading && <MessageInfo message={message} />}
    </Layout>
  )
}
