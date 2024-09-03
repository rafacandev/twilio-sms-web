import { Options } from "./Options"
import { select } from "../../ui/classes"
import { Loading3QuartersOutlined } from "@ant-design/icons"
import { emptyFn } from "../../js/types"

const defaultOption = { val: "", text: "" }

export const Select = ({
  options = [defaultOption],
  selected = defaultOption,
  loading = true,
  expanded = false,
  onChange = emptyFn,
}) => {
  if (!expanded) return null
  if (options.length < 1) return null
  if (loading) {
    return (
      <div
        className="absolute left-0 top-8 w-full h-10 rounded bg-white border-2 border-violet-200
        flex justify-center items-center"
      >
        <div>
          <Loading3QuartersOutlined className="text-purple-600 font-extrabold" spin="true" />
        </div>
      </div>
    )
  }

  return (
    <select
      size="7"
      value={selected.val}
      className={`absolute left-0 top-8 w-full ${select}`}
      onChange={ev => onChange(ev.target.value)}
    >
      <Options options={options} />
    </select>
  )
}
