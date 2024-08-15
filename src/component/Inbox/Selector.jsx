import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { maskPhoneNumber } from "../PhoneNumberSelector/PhoneNumberSelector"
import { select, selectOptions } from "../../ui/classes"
import { emptyFn } from "../../js/types"

const toOptions = (phoneNumbers = []) => {
  const options = phoneNumbers.map(p => ({ val: p, text: maskPhoneNumber(p) }))
  return [{ val: "all", text: "All phone numbers" }, ...options]
}

export const MessageFilterOption = {
  all: 'all',
  recent: 'recent',
  received: 'received',
  sent:'sent'
}

export const Selector = ({ className = "", phoneNumbers = [], loading = true, onMessageFilterChange = emptyFn }) => {
  return (
    <div className={className}>
      <div className="flex gap-1">
        <select defaultValue="recent" className={`${select}`} onChange={e => onMessageFilterChange(e.target.value)}>
          <option className={selectOptions} value={MessageFilterOption.recent}>
            Recent messages
          </option>
          <option className={selectOptions} value={MessageFilterOption.received}>
            Received messages
          </option>
          <option className={selectOptions} value={MessageFilterOption.sent}>
            Sent messages
          </option>
          <option className={selectOptions} value={MessageFilterOption.all}>
            All messages
          </option>
        </select>
        <SelectAutoComplete className="w-36" options={toOptions(phoneNumbers)} defaultValue="all" loading={loading} />
      </div>
    </div>
  )
}
