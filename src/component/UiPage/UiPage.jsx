import dayjs from "dayjs"
import { Layout } from "../Layout/Layout"
import { MessageRows } from "../MessageRows/MessageRows"
import { NotFoundPage } from "../NotFoundPage/NotFoundPage"
import { Selector } from "../InboxPage/Selector"
import { useState } from "react"
import { Combobox } from "../Combobox/Combobox"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"
import { MessageInfo } from "../MessageInfo/MessageInfo"
import { PhoneCombobox } from "../PhoneCombobox/PhoneComboox"

/**
 * @typedef {import ('../../js/types').Message} Message
 */

/**
 * @type {Array<Message>}
 */
const messages = [
  {
    body: "Hey, I just wanted to check in—have you managed to wrap up the project we've been working on?",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1a2b3c4d5e6f7g8h9i0j",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(2, "hours"),
    isRead: false,
    hasMedia: false,
    media: 0,
  },
  {
    body: "I'm almost done with it! I'm putting the finishing touches on everything right now. I should be able to send it your way within the next hour or so.",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM0j9i8h7g6f5e4d3c2b1a",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(1, "hour"),
    isRead: false,
    hasMedia: true,
    media: 0,
  },
  {
    body: "That's great to hear! Thank you for keeping me updated. When you send it over, could you also include a summary of the key points we discussed during our last meeting? I think it would be helpful to have everything in one place.",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1b2c3d4e5f6g7h8i9j0k",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(55, "minutes"),
    isRead: false,
    hasMedia: false,
    media: 0,
  },
  {
    body: "Of course, I can include the summary as well. Let me pull up my notes from the meeting to make sure I've covered all the important details. I'll bundle it together with the project deliverables when I send it over shortly.",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM0k9j8i7h6g5f4e3d2c1b",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(50, "minutes"),
    isRead: undefined,
  },
  {
    body: "Alright, I've just sent over the completed project along with the summary of the meeting. Please note that the table containing the product pricing details isn't finalized yet. The product team is still deliberating on the best pricing strategy, and they have a meeting scheduled with the suppliers later this week to finalize those details. Let me know if there's anything else you'd like me to address or if you need clarification on anything!",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM9f8e7d6c5b4a3d2c1b0a",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(30, "minutes"),
    isRead: false,
    hasMedia: true,
    media: 0,
  },
  {
    body: "Got it! I've received everything, and I just had a look through it all. Everything appears to be in good shape. Thanks so much for turning this around so quickly—I really appreciate your effort!",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM0a1b2c3d4e5f6g7h8i9j",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(20, "minutes"),
    isRead: true,
    hasMedia: true,
    media: 0,
  },
  {
    body: "No problem at all! I'm happy to help. Please don't hesitate to reach out if you think of anything else that needs to be adjusted or added.",
    direction: "outbound-reply",
    from: "+15550000002",
    messageSid: "SM9j8i7h6g5f4e3d2c1b0a",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(10, "minutes"),
    isRead: true,
    media: 0,
  },
  {
    body: "Will do, thank you! By the way, I was wondering if you're available for a quick call later today? I'd like to discuss a couple of things in more detail.",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "SM1j2i3h4g5f6e7d8c9b0a",
    status: "delivered",
    to: "+15550000002",
    date: dayjs().subtract(5, "minutes"),
    isRead: false,
    media: 0,
  },
  {
    body: "Absolutely, I can make time for a call. I'm free anytime after 3 PM—does that timeframe work for you?",
    direction: "outbound",
    from: "+15550000002",
    messageSid: "SM0k1j2i3h4g5f6e7d8c9b",
    status: "delivered",
    to: "+15550000001",
    date: dayjs().subtract(1, "minute"),
    isRead: true,
    media: 0,
  },
  {
    body: "That works perfectly! Let's touch base then. Thanks again for all your help, and I'll talk to you later!",
    direction: "inbound",
    from: "+15550000001",
    messageSid: "MM3e8ef063aeda3ca5e3f56a5f332ced08",
    status: "delivered",
    to: "+15550000002",
    date: dayjs(),
    isRead: true,
    media: 1,
  },
]

const phoneNumbersOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `+1555000000${i}`).map(i => ({ val: i, text: i }))
const message = messages[messages.length - 1]

export const UiPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("all")
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
      <input defaultValue="Regular input" />
      <input defaultValue="Required input" required />
      <input defaultValue="Disabled input" disabled />

      <h2 className="mt-5">Custom Elements</h2>
      <p>Elements that are created as a component and inserted into the UI and requires the UI framework.</p>
      <h3>Combobox</h3>
      <Combobox options={phoneNumbersOptions.map(o => o.val)} />
      <h3>PhoneCombobox</h3>
      <PhoneCombobox options={phoneNumbersOptions.map(o => o.val)} />
      <h3>Error</h3>
      <ErrorLabel error="Something terrible has happened." />

      <h3>Message Info</h3>
      <MessageInfo message={message} />
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
