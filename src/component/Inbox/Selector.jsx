import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { maskPhoneNumber } from "../PhoneNumberSelector/PhoneNumberSelector"
import { select, selectOptions } from "../../ui/classes"

const toOptions = (phoneNumbers = []) => {
  const options = phoneNumbers.map(p => ({ val: p, text: maskPhoneNumber(p) }))
  return [{ val: "all", text: "All phone numbers" }, ...options]
}

export const Selector = ({ className = "", phoneNumbers = [], loading = true }) => {
  return (
    <div className={className}>
      <div className="flex gap-1">
        <select defaultValue="recent" className={`${select}`}>
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
    </div>
  )
}
