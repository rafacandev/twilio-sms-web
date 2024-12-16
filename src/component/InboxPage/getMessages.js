import { getTwilioMessages, sortByDate } from "../../js/getTwilioMessages"
import { allPhones, MessageFilterEnum } from "./Selector"

/**
 * @typedef {import ("../../js/getTwilioMessages").Message} Message
 */

/**
 *
 * @returns {Promise<Array<Message>>}
 */
export const getMessages = async (phoneNumber = allPhones, filter = MessageFilterEnum.all) => {
  if (phoneNumber === allPhones) {
    return await getTwilioMessages()
  }

  if (MessageFilterEnum.received === filter) {
    return await getTwilioMessages(undefined, phoneNumber)
  }

  if (MessageFilterEnum.sent === filter) {
    return await getTwilioMessages(phoneNumber)
  }

  const from = await getTwilioMessages(phoneNumber)
  const to = await getTwilioMessages(undefined, phoneNumber)
  return from.concat(to).sort(sortByDate)
}
