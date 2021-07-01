import {LoadingOutlined} from "@ant-design/icons";
import { RightCircleFilled } from '@ant-design/icons';

const toBaseDirection = direction => direction.includes('inbound') ? 'inbound' : 'outbound'
const messageLabelClass = direction => `message-list-card-label text-code text-small ${toBaseDirection(direction)}`
const messageLabelRotation = direction => toBaseDirection(direction) === 'inbound' ? 180 : 0

const toDateString = (date) => {
  const d = new Date(date)
  return `${d.toDateString()} ${d.toLocaleTimeString()}`
}

export const MessagePanel = ({message}) => (
  <div className="message-list-card">
    <div className={messageLabelClass(message.direction)}>
      <RightCircleFilled rotate={messageLabelRotation(message.direction)} />
    </div>
    <div>
      <div className="message-list-card-header text-tiny">
        <span>
          <strong>From:</strong> {message.from}
        </span>
        <span>
          <strong>To:</strong> {message.to}
        </span>
        <span className="message-list-card-header-status">
          <strong>Status:</strong> {message.status}
        </span>
        <span>
          <strong>Direction:</strong> {message.direction}
        </span>
      </div>
      <div className="message-list-card-body text-code text-small">
        {message.body}
      </div>
      <div className="message-list-card-footer text-tiny">
        <strong>Date: </strong>{toDateString(message?.date)}
      </div>
    </div>
  </div>
)

export const Loading = () => <>
  <div className="text-center message-list-loading-container">
    <LoadingOutlined className="message-list-loading text-primary" />
  </div>
</>
