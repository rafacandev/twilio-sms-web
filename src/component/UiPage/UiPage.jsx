import dayjs from "dayjs"
import { Layout } from "../Layout/Layout"
import { MessageRows } from "../MessageRows/MessageRows"
import { NotFoundPage } from "../NotFoundPage/NotFoundPage"
import { Selector } from "../Inbox/Selector"
import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { useState } from "react"
import { Combobox } from "../Combobox/Combobox"
import { ErrorLabel } from "../ErrorLabel/ErrorLabel"

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
      <h3>UI Page</h3>
      <p className="italic">Display mocked UI elements for quick iteration</p>
      <div className="mt-8">
        <h5>Native Elements</h5>
        <h6>Buttons</h6>
        <div className="flex gap-3">
          <button type="button">Simple Button</button>
          <button className="w-56">Wide button</button>
        </div>
      </div>
      <div className="mt-8">
        <h5>Custom Elements</h5>
        <h4>Combobox</h4>
        <Combobox options={phoneNumbersOptions.map(o => o.val)} />
        <h4>Error</h4>
        <ErrorLabel error="Something terrible has happened."></ErrorLabel>

        <div
          id="toast-success"
          class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ms-3 text-sm font-normal">Item moved successfully.</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <div
          id="toast-danger"
          class="flex items-center w-full max-w-sm p-4 mb-4 bg-white rounded-lg shadow"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          </div>
          <div class="ms-3 text-sm font-normal">Item has been deleted.</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 border-gray-400"
            data-dismiss-target="#toast-danger"
            aria-label="Close"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <div
          id="toast-warning"
          class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span class="sr-only">Warning icon</span>
          </div>
          <div class="ms-3 text-sm font-normal">Improve password difficulty.</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-warning"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h5>Select with auto-complete</h5>
        <div className="flex items-center gap-4 my-2">
          <SelectAutoComplete options={phoneNumbersOptions} value="+15550000001" />
          <SelectAutoComplete options={phoneNumbersOptions} value="default" loading="false" />
        </div>
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
