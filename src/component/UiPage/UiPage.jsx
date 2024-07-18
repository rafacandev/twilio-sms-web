import dayjs from "dayjs"
import { DockedLayout } from "../DockedLayout/DockedLayout"
import { MessageRows } from "../MessageRows/MessageRows"

/**
 * @typedef {import ('../../js/types').Message}
 */

/**
 * @type {Array<Message>}
 */
const messages = [
  {
    body: "I have a great chocolate cake recipe that you should try. I'm going to send it to you.",
    direction: "outbound-reply",
    from: "+15550000002",
    messageSid: "SM353e3a1cba2954973ff040a37bed2590",
    status: "undelivered",
    to: "+15550000001",
    date: dayjs().subtract(40, "second"),
    isRead: true,
  },
  {
    body: "Check out this amazing new restaurant I found. You have to visit it!",
    direction: "inbound",
    from: "+15550000002",
    messageSid: "SM3fbd8b8d17b341b8e8d7f1e1b7287b20",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(5, "minute"),
  },
  {
    body: `Don't forget our meeting tomorrow at 10 AM.
    However we need to prepare the reception.
    So, how about if we arrive 15min earlier?
    I am sorry for the short notice but that just came to mind.`,
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM47bfc5e10f8c4b1b9a6f3a0b712bb1d5",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(2, "month"),
    isRead: true,
  },
  {
    body: "Just wanted to say hi! How have you been?",
    direction: "inbound-reply",
    from: "+15550000002",
    messageSid: "SM75a5b42b8e14f60b12f27c8a8b1e6f02",
    status: "undelivered",
    to: "+15550000001",
    date: dayjs().subtract(3, "year"),
  },
]

export const UiPage = () => (
  <DockedLayout>
    <h3>UI Page</h3>
    <p className="italic">Display mocked UI elements for quick iteration</p>

    <p className="my-1">MessageRows with messages</p>
    <MessageRows messages={messages} />
  </DockedLayout>
)
