import "./MediaViewer.css"
import { useEffect, useState } from "react"
import useGetTwilioMedia from "../../hook/useGetTwilioMedia"
import { LoadingOutlined } from "@ant-design/icons"

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

const MediaViewer = ({ messageSid = "" }) => {
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState([])
  const getMedia = useGetTwilioMedia()

  useEffect(() => {
    getMedia(messageSid).then(m => {
      setMedia(m)
      setLoading(false)
    })
  }, [getMedia, messageSid])

  if (loading) {
    return <Loading />
  }

  if (media.length === 0) {
    return null
  }

  return <MediaContent media={media} />
}

export default MediaViewer
