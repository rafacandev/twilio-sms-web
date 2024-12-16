import { Combobox } from "../Combobox/Combobox"
import { emptyFn } from "../../js/types"
import { useState } from "react"

// A plus or starts with plus followed by digits
const phoneTypingPattern = "^\\+$|^\\+\\d+$"

export const PhoneCombobox = ({
  initial = "",
  options = [],
  loading = false,
  disabled = false,
  onSelect = emptyFn,
}) => {
  const [phone, setPhone] = useState(initial)
  const validationPattern = options.map(o => o.replaceAll("+", "\\+")).join("|")

  const handleOnChange = (p = "") => {
    if (initial.toLowerCase().includes(p.toLowerCase())) {
      setPhone(p)
      return
    }
    const valueToChange = "+" + p.replace(/\D/g, "")
    if (options.includes(valueToChange) || valueToChange.match(phoneTypingPattern)) {
      setPhone(p)
    }
  }

  return (
    <Combobox
      options={options}
      loading={loading}
      pattern={validationPattern}
      placeholder="Select a phone"
      value={phone}
      disabled={disabled}
      onChange={handleOnChange}
      onSelect={onSelect}
    />
  )
}
