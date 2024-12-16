import { fromNow } from "../../js/util"
import { CopyOutlined } from "@ant-design/icons"
import { MediaViewer } from "../MediaViewer/MediaViewer"
import { copyToClipboard } from "../../js/util"

/**
 * @typedef {import("../../js/types").Message} Message
 */

/**
 * @component
 * @param {Object} props - The props object for the component.
 * @param {Message} props.message - The message object containing information to display.
 * @returns {JSX.Element} A JSX element displaying the message information.
 */
export const MessageInfo = ({ message }) => (
  <div className="p-2 border-2 bg-white rounded">
    <div>
      <span className="capitalize inline-block w-full max-w-60 py-1">
        <b>Direction:</b> {message.direction}
      </span>
      <span
        className="capitalize hover:cursor-pointer active:text-gray-600"
        onClick={() => copyToClipboard(message.messageSid)}
      >
        <CopyOutlined className="text-gray-500 pr-1" />
        <b>MessageSid:</b> {message.messageSid}
      </span>
    </div>
    <div>
      <span className="capitalize inline-block w-full max-w-60 py-1">
        <b>Status:</b> {message.status}
      </span>
      <span
        className="capitalize hover:cursor-pointer active:text-gray-600"
        onClick={() => copyToClipboard(message.to)}
      >
        <CopyOutlined className="text-gray-500 pr-1" />
        <b>To:</b> {message.to}
      </span>
    </div>
    <div>
      <span className="capitalize inline-block w-full max-w-60 py-1">
        <b>Timestamp:</b> {fromNow(message.date)}
      </span>
      <span
        className="capitalize hover:cursor-pointer active:text-gray-600"
        onClick={() => copyToClipboard(message.from)}
      >
        <CopyOutlined className="text-gray-500 pr-1" />
        <b>From:</b> {message.from}
      </span>
    </div>
    <div>
      <span className="capitalize inline-block w-full max-w-60 py-1">
        <b>Attachments:</b> {message.media}
      </span>
    </div>
    <div>{message.body}</div>
    <div className="mt-2 flex justify-center flex-wrap">
      <MediaViewer messageSid={message.messageSid} />
    </div>
  </div>
)
