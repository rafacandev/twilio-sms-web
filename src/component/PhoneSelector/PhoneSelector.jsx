import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { maskPhoneNumber } from "../PhoneNumberSelector/PhoneNumberSelector"
import { emptyFn } from "../../js/types"

const toOptions = (phoneNumbers = [], includeAllOption) => {
  const options = phoneNumbers.map(p => ({ val: p, text: maskPhoneNumber(p) }))
  const includeOptions = includeAllOption ? [{ val: "default", text: "All phone numbers" }] : []
  return [...includeOptions, ...options]
}
export const PhoneSelector = ({
  phoneNumbers = [],
  phoneNumber = "default",
  loading = true,
  includeAllOption = true,
  onPhoneNumberChange = emptyFn,
}) => (
  <SelectAutoComplete
    className="w-36"
    options={toOptions(phoneNumbers, includeAllOption)}
    value={phoneNumber}
    defaultValue="default"
    loading={loading}
    onChange={onPhoneNumberChange}
  />
)
