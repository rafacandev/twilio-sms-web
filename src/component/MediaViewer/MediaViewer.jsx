import "./MediaViewer.css"
import { useEffect, useState } from "react"
import { getTwilioMedia } from "../../core/getTwilioMedia"
import { LoadingOutlined } from "@ant-design/icons"
import { useAuthentication } from "../../context/AuthenticationProvider"
import { isEmpty} from "lodash"

const Loading = () => (
  <div className="message-viewer-loading">
    <LoadingOutlined className="text-primary" />
    <span className="message-viewer-loading-text">Loading media...</span>
  </div>
)

const MediaContent = ({ media = [] }) => (
  <div className="message-viewer">
    {media.map(m => (
      <img className="message-viewer-content" key={m} src={m} alt="Attached media file (MMS)" />
    ))}
  </div>
)

export const MediaViewer = ({ messageSid = "" }) => {
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState([])
  const [authentication] = useAuthentication()


  useEffect(() => {
    getTwilioMedia(authentication, messageSid).then(m => {
      setMedia(m)
      setLoading(false)
    })
  }, [authentication, messageSid])

  if (loading) {
    return <Loading />
  }

  if (isEmpty(media)) {
    return null
  }

  return <MediaContent media={media} />
}
