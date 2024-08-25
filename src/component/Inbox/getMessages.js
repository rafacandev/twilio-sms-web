import { getTwilioMessages, sortByDate } from "../../js/getTwilioMessages"
import { MessageFilterOption } from "./Selector"

/**
 * @typedef {import ("../../js/getTwilioMessages").Message} Message
 */

/**
 * 
 * @returns {Promise<Array<Message>>}
 */
export const getMessages = async (phoneNumber = "default", filter = MessageFilterOption.all) => {
  if (phoneNumber === "default") {
    return getTwilioMessages()
  }

  if (MessageFilterOption.received === filter) {
    return await getTwilioMessages(undefined, phoneNumber)
  }

  if (MessageFilterOption.sent === filter) {
    return await getTwilioMessages(phoneNumber)
  }

  const from = await getTwilioMessages(phoneNumber)
  const to = await getTwilioMessages(undefined, phoneNumber)
  return from.concat(to).sort(sortByDate)
}
