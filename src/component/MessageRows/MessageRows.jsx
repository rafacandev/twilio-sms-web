import { fromNow } from "../../js/util"

/**
 * @typedef {Object} Message
 * @prop {string} messageSid
 * @prop {string} from
 * @prop {string} to
 * @prop {string} body
 * @prop {Date} date
 * @prop {boolean} isRead
 */

/**
 * @param {Message} message
 */
const MessageRow = message => (
  <div
    key={message.messageSid}
    className="border-t-2 border-l-8 border-l-transparent border-violet-200 hover:border-l-violet-500 hover:bg-violet-100 hover:cursor-pointer active:bg-violet-200 p-3"
  >
    <div className="flex text-xs text-gray-500 mb-1">
      <div className="w-20">
        <b>Inbound</b>
      </div>
      <div className="w-32">
        <b>To:</b>
        {message.to}
      </div>
      <div className="w-36">
        <b>From:</b>
        {message.from}
      </div>
      <div className="invisible md:visible">{fromNow(message.date)}</div>
    </div>
    <div>{message.body}</div>
  </div>
)

/**
 * @param {{messages: Array<Message>}} messages
 */
export const MessageRows = ({ messages }) => (
  <div className="border-violet-200 border-b-2 border-x-2">{messages.map(MessageRow)}</div>
)
