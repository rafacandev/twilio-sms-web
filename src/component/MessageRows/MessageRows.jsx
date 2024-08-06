import { ContainerOutlined, PaperClipOutlined } from "@ant-design/icons"
import { fromNow } from "../../js/util"
import { isEmpty } from "lodash"

/**
 * @typedef { @impor("../types").Message} Message
 */

/**
 * @param {Message} message
 * @returns {boolean}
 */
const isRead = message => message.isRead ?? false

/**
 * @param {Message} message
 * @returns {string}
 */
const isReadContent = message => (isRead(message) ? "bg-gray-200 text-gray-600" : "bg-white")

/**
 * @param {Message} message
 * @returns {string}
 */
const isReadHeader = message => (isRead(message) ? "text-gray-400" : "text-gray-500")

/**
 *
 * @param {Message} message
 * @returns
 */
const messageBody = message =>
  isEmpty(message.body) && message.hasMedia ? "Message contains attachments" : message.body

/**
 * @param {Message} message
 */
const MessageRow = message => (
  <div
    key={message.messageSid}
    className={`flex
  ${isReadContent(message)}
  border-violet-200 border-b-2
  shadow-black
  hover:bg-violet-100 hover:cursor-pointer  hover:shadow-md hover:border-b-violet-400 hover:border-l-violet-400
  active:bg-violet-200 h-24
  `}
  >
    <div className="px-2">
      <ContainerOutlined className="block mt-6 text-lg text-violet-900" />
      {message.hasMedia && <PaperClipOutlined className="block mt-2 text-violet-900" />}
    </div>
    <div className="grow">
      <div className={`${isReadHeader(message)} text-xs my-2 overflow-clip font-sans font-light`}>
        <span className="inline-block w-32">
          <b>To:</b>
          {message.to}
        </span>
        <span className="inline-block w-36">
          <b>From:</b>
          {message.from}
        </span>
        <span className="hidden md:inline-block">{fromNow(message.date)}</span>
      </div>
      <div className="line-clamp-3">{messageBody(message)}</div>
    </div>
  </div>
)

/**
 * @param {{messages: Array<Message>}} messages
 */
export const MessageRows = ({ messages }) => (
  <div className="border-2 border-b-0 border-violet-200">{messages.map(MessageRow)}</div>
)
