import { SelectAutoComplete } from "../SelectAutoComplete/SelectAutoComplete"
import { maskPhoneNumber } from "../PhoneNumberSelector/PhoneNumberSelector"
import { emptyFn } from "../../js/types"

const toOptions = (phoneNumbers = []) => {
  const options = phoneNumbers.map(p => ({ val: p, text: maskPhoneNumber(p) }))
  return [{ val: "default", text: "All phone numbers" }, ...options]
}
export const PhoneSelector = ({
  phoneNumbers = [],
  phoneNumber = "default",
  loading = true,
  onPhoneNumberChange = emptyFn,
}) => (
  <SelectAutoComplete
    className="w-36"
    options={toOptions(phoneNumbers)}
    value={phoneNumber}
    defaultValue="default"
    loading={loading}
    onChange={onPhoneNumberChange}
  />
)
