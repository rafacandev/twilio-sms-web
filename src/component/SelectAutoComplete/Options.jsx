import { selectOptions } from "../../ui/classes"

export const Options = ({ options = [{ val: "", text: "" }] }) =>
  options.map(o => (
    <option key={o.val} value={o.val} className={selectOptions}>
      {o.text}
    </option>
  ))
