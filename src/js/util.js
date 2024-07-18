import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

/**
 *
 * @param {Date | null | undefined} date
 * @returns {string | null} Time from now
 */
export const fromNow = date => {
  if (!date) return null
  return dayjs(date).fromNow()
}
