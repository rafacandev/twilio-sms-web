/**
 * @readonly
 * @enum {string}
 */
export const MessageDirection = {
  sent: "sent",
  received: "received",
}

/**
 * @typedef {Object} Message
 * @prop {string} messageSid
 * @prop {string} direction
 * @prop {string} from
 * @prop {string} to
 * @prop {string} status
 * @prop {string} body
 * @prop {boolean} hasMedia
 */

export const emptyFn = () => {}
