import { getTwilioMessages, sortByDate } from "../../js/getTwilioMessages"

/**
 * @typedef {import ("../../js/getTwilioMessages").Message} Message
 */

/**
 * @returns {Promise<Array<Message>>}
 */
export const getMessages = async (phoneNumber = "default") => {
  if (phoneNumber === "default") {
    return getTwilioMessages()
  }

  const from = await getTwilioMessages(phoneNumber)
  const to = await getTwilioMessages(undefined, phoneNumber)
  return from.concat(to).sort(sortByDate)
}
