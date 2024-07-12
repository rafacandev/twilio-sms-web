/**
 * @typedef {Object} Message
 * @prop {string} messageSid
 * @prop {string} body
 * @prop {boolean} isRead
 */

const classRow = (isRead = false) => (isRead ? `bg-slate-50 ` : `bg-slate-200`)

/**
 * @param {Message} message
 */
export const MessageRow = message => (
  <div
    key={message.messageSid}
    className={`flex items-center border-l-8
   hover:cursor-pointer hover:border-violet-300 hover:bg-blue-50
    ${classRow(message.isRead)}`}
  >
    <div className="h-12 w-44 flex items-center border-r-2 mr-2 pl-2">{message.from}</div>
    <div className="truncate w-full">{message.body}</div>
  </div>
)

/**
 * @param {{messages: Array<Message>}} messages
 */
export const MessageRows = ({ messages }) => (
  <div>
    <div className="flex items-center border-l-8 bg-white border-2">
      <div className="h-8 w-44 flex items-center border-r-2 mr-2 pl-2">From</div>
      <div className="truncate w-full">Message</div>
    </div>
    {messages.map(m => MessageRow(m))}
  </div>
)
