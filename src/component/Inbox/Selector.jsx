import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { maskPhoneNumber } from "../PhoneNumberSelector/PhoneNumberSelector"
import { select, selectOptions } from "../../ui/classes"
import { emptyFn } from "../../js/types"

const toOptions = (phoneNumbers = []) => {
  const options = phoneNumbers.map(p => ({ val: p, text: maskPhoneNumber(p) }))
  return [{ val: "default", text: "All phone numbers" }, ...options]
}

export const MessageFilterOption = {
  all: "all",
  received: "received",
  sent: "sent",
}

const SelectDirection = ({onMessageFilterChange=emptyFn}) => (
  <select defaultValue="recent" className={`${select}`} onChange={e => onMessageFilterChange(e.target.value)}>
  <option className={selectOptions} value={MessageFilterOption.all}>
    All messages
  </option>
  <option className={selectOptions} value={MessageFilterOption.received}>
    Received messages
  </option>
  <option className={selectOptions} value={MessageFilterOption.sent}>
    Sent messages
  </option>
</select>
)

export const Selector = ({ className = "", phoneNumbers = [], phoneNumber =  loading = true, onMessageFilterChange = emptyFn, onPhoneNumberChange = emptyFn }) => {


  return (
    <div className={className}>
      <div className="flex gap-1">
        <SelectAutoComplete className="w-36" options={toOptions(phoneNumbers)} defaultValue="default" loading={loading} onChange={onPhoneNumberChange} />
        <SelectDirection onMessageFilterChange={onMessageFilterChange}/>
      </div>
    </div>
  )
}
