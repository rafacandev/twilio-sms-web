import {LoadingOutlined} from "@ant-design/icons";
import { RightCircleFilled } from '@ant-design/icons';

const toBaseDirection = direction => direction.includes('inbound') ? 'inbound' : 'outbound'
const messageLabelClass = direction => `message-list-card-label text-code text-small ${toBaseDirection(direction)}`
const messageLabelRotation = direction => toBaseDirection(direction) === 'inbound' ? 180 : 0

export const MessagePanel = ({message}) => (
  <div className="message-list-card">
    <div className={messageLabelClass(message.direction)}>
      <RightCircleFilled rotate={messageLabelRotation(message.direction)} />
    </div>
    <div>
      <div className="message-list-card-header text-small">
        <spam><strong>From:</strong> {message.from}</spam>
        <spam><strong>To:</strong> {message.to}</spam>
        <spam><strong>Direction:</strong> {message.direction}</spam>
        <spam><strong>Status:</strong> {message.status}</spam>
      </div>
      <div className="message-list-card-body text-code text-small">
        {message.body}
      </div>
    </div>
  </div>
)

export const Loading = () => <>
  <div className="text-center message-list-loading-container">
    <LoadingOutlined className="message-list-loading text-primary" />
  </div>
</>
