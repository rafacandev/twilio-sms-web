import "./MediaViewer.css"
import { useEffect, useState } from "react"
import { getTwilioMedia } from "../../core/getTwilioMedia"
import { LoadingOutlined } from "@ant-design/icons"
import { isEmpty } from "lodash"
import { useIsMounted } from "../../core/useIsMounted"

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
  const isMounted = useIsMounted()

  useEffect(() => {
    getTwilioMedia(messageSid)
      .then(m => isMounted() && setMedia(m))
      .catch(err => console.log("TODO: Create a warning component for the user to know about the failure", err))
      .then(() => isMounted() && setLoading(false))
  }, [isMounted, messageSid, setMedia, setLoading])

  if (loading) {
    return <Loading />
  }

  if (isEmpty(media)) {
    return null
  }

  return <MediaContent media={media} />
}
