import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);

/**
 * 
 * @param {Date | null | undefined} date 
 * @returns {string} Time from now
 */
export const fromNow = (date) => {
  if (!date) return null
  return dayjs(date).fromNow(true)
    // const since = dayjs(date).subtract(dayjs())
    // console.log(since)
}