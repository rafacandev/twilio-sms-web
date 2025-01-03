import { selectOptions } from "../../ui/classes"
import { emptyFn } from "../../js/types"
import { PhoneCombobox } from "../PhoneCombobox/PhoneComboox"

const isValidOption = (phoneNumber = "", phoneNumbers = []) => phoneNumbers.find(p => p === phoneNumber) !== undefined

export const allPhones = "All phone numbers"

export const MessageFilterEnum = {
  all: "All messages",
  received: "Received messages",
  sent: "Sent messages",
}

const SelectDirection = ({ onMessageFilterChange = emptyFn }) => (
  <select onChange={e => onMessageFilterChange(e.target.value)}>
    <option className={selectOptions} value={MessageFilterEnum.all}>
      {MessageFilterEnum.all}
    </option>
    <option className={selectOptions} value={MessageFilterEnum.received}>
      {MessageFilterEnum.received}
    </option>
    <option className={selectOptions} value={MessageFilterEnum.sent}>
      {MessageFilterEnum.sent}
    </option>
  </select>
)

export const Selector = ({
  phoneNumbers = [],
  phoneNumber = allPhones,
  loading = true,
  onMessageFilterChange = emptyFn,
  onPhoneNumberChange = emptyFn,
}) => (
  <div className="flex gap-2 mb-2">
    <PhoneCombobox
      initial={allPhones}
      loading={loading}
      options={[allPhones, ...phoneNumbers]}
      onSelect={onPhoneNumberChange}
    />
    {isValidOption(phoneNumber, phoneNumbers) && <SelectDirection onMessageFilterChange={onMessageFilterChange} />}
  </div>
)
