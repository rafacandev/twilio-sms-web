import dayjs from "dayjs"
import { Layout } from "../Layout/Layout"
import { MessageRows } from "../MessageRows/MessageRows"
import { NotFoundPage } from "../NotFoundPage/NotFoundPage"
import { Selector } from "../Inbox/Selector"
import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { useState } from "react"
import { Combobox } from "../Combobox/Combobox"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { InputField } from "../InputField/InputField"

/**
 * @typedef {import ('../../js/types').Message} Message
 */

/**
 * @type {Array<Message>}
 */
const messages = [
  {
    body: "Hey, have you finished the project?",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1a2b3c4d5e6f7g8h9i0j",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(2, "hours"),
    isRead: false,
    hasMedia: false,
  },
  {
    body: "Almost done. I'll send it over in an hour.",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM0j9i8h7g6f5e4d3c2b1a",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(1, "hour"),
    isRead: false,
    hasMedia: true,
  },
  {
    body: "Great! Can you also include the summary of the last meeting?",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1b2c3d4e5f6g7h8i9j0k",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(55, "minutes"),
    isRead: false,
    hasMedia: false,
  },
  {
    body: "Sure, I'll add it in. isRead === undefined",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM0k9j8i7h6g5f4e3d2c1b",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(50, "minutes"),
    isRead: undefined,
  },
  {
    body: "Just sent the project and the summary. Please note that the table with the product prices isn't final yet; the product team still need to decide on the best price strategy, they are meeting with suppilers this coming week. Let me know if you need anything else.",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM9f8e7d6c5b4a3d2c1b0a",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(30, "minutes"),
    isRead: false,
    hasMedia: true,
  },
  {
    body: "Received. Everything looks good. Thanks for the quick turnaround!",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM0a1b2c3d4e5f6g7h8i9j",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(20, "minutes"),
    isRead: true,
    hasMedia: true,
  },
  {
    body: "No problem! Let me know if there's anything else you need.",
    direction: "outbound-reply",
    from: "+15550000002",
    messageSid: "SM9j8i7h6g5f4e3d2c1b0a",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(10, "minutes"),
    isRead: true,
  },
  {
    body: "Will do. By the way, are you free for a quick call later?",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1j2i3h4g5f6e7d8c9b0a",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(5, "minutes"),
    isRead: false,
  },
  {
    body: "Yes, I'm free after 3 PM. Does that work for you?",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM0k1j2i3h4g5f6e7d8c9b",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(1, "minute"),
    isRead: true,
  },
  {
    body: "Perfect. Talk to you then!",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1a2b3c4d5e6f7g8h9i0k",
    status: "delivered",
    to: "+15550000002",
    date: dayjs(),
    isRead: true,
  },
]

const phoneNumbersOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `+1555000000${i}`).map(i => ({ val: i, text: i }))

export const UiPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("default")
  return (
    <Layout>
      <h1>UI Page</h1>
      <p className="italic">Display UI elements for quick iteration</p>

      <h2 className="mt-5">Native Elements</h2>
      <p>Elements that are being natively inserted into the UI and don't rely on the UI framework.</p>
      <h3>Typography</h3>
      <p>
        This is a regular paragraph with a lorem ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Aliquid minima, magni beatae ipsum tempora asperiores quaerat nam incidunt voluptatibus pariatur. Inventore
        voluptatem eius ducimus error numquam vero, a esse aliquam!
      </p>
      <div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </div>

      <h2 className="mt-5">Buttons</h2>
      <div className="flex gap-3">
        <button>Simple Button</button>
        <button className="w-56">Wide button</button>
      </div>

      <h2 className="mt-5">Inputs</h2>
      <input value="Regular input" />
      <input value="Required input" required />
      <input value="Disabled input" disabled />

      <h2 className="mt-5">Custom Elements</h2>
      <p>Elements that are created as a component and inserted into the UI and requires the UI framework.</p>
      <h3>Combobox</h3>
      <Combobox options={phoneNumbersOptions.map(o => o.val)} />
      <h3>Error</h3>
      <ErrorLabel error="Something terrible has happened." />

      <h2 className="mt-5">Select with auto-complete</h2>
      <div className="flex items-center gap-4 my-2">
        <SelectAutoComplete options={phoneNumbersOptions} value="+15550000001" />
        <SelectAutoComplete options={phoneNumbersOptions} value="default" loading="false" />
      </div>

      <p className="my-1">MessageRows with messages</p>
      <Selector
        className="mb-1"
        phoneNumber={phoneNumber}
        phoneNumbers={phoneNumbersOptions.map(o => o.val)}
        loading={false}
        onPhoneNumberChange={setPhoneNumber}
      />
      <MessageRows messages={messages} />
      <hr />
      <NotFoundPage />
    </Layout>
  )
}
