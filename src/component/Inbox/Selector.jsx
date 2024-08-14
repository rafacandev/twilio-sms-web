import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { maskPhoneNumber } from "../PhoneNumberSelector/PhoneNumberSelector"
import { select, selectOptions } from "../../ui/classes"

export const selectClass = `mb-1 border-2 rounded text-sm block w-30 p-1.5
bg-gray-50 border-violet-200 focus:ring-blue-500 focus:border-blue-500
dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`

const toOptions = (phoneNumbers = []) => {
  const options = phoneNumbers.map(p => ({ val: p, text: maskPhoneNumber(p) }))
  return [{ val: "all", text: "All phone numbers" }, ...options]
}

export const Selector = ({ phoneNumbers = [], loading = true }) => {
  return (
    <div className="flex">
      <select defaultValue="recent" className={select}>
        <option className={selectOptions} value="recent">
          Recent messages
        </option>
        <option className={selectOptions} value="received">
          Received messages
        </option>
        <option className={selectOptions} value="sent">
          Sent messages
        </option>
        <option className={selectOptions} value="all">
          All messages
        </option>
      </select>
      <SelectAutoComplete className="w-36" options={toOptions(phoneNumbers)} defaultValue="all" loading={loading} />
    </div>
  )
}
