import { useState } from "react"
import { emptyFn } from "../../js/types"

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

const Options = ({ options = [], onChange = emptyFn }) =>
  options.map((o, i) => (
    <option key={i} value={o} className="px-2 py-1.5 hover:via-violet-200" onChange={onChange}>
      {o}
    </option>
  ))

const Select = ({ options = [], value = "", selected = "", isPrestine = true, onChange = emptyFn }) => {
  if (isPrestine) return null
  if (options.length < 1) return null
  if (options.find(o => o.toLowerCase() === value.toLowerCase()) !== undefined) return null

  return (
    <>
      <select
        size="7"
        value={selected}
        className={`absolute left-0 top-8 w-full border-2 rounded border-violet-200 bg-white`}
        onChange={ev => onChange(ev.target.value)}
      >
        <Options options={options} />
      </select>
    </>
  )
}

export const SelectAutoComplete = ({}) => {
  const [text, setText] = useState("")
  const [optionIndex, setSelectedIndex] = useState(0)
  const filteredOptions = states.filter(o => o.toLowerCase().includes(text.toLowerCase()))
  const [isPrestine, setPrestine] = useState(true)

  const selectOption = (direction = 0) => {
    const target = optionIndex + direction
    if (target >= filteredOptions.length || target < 0) return
    setSelectedIndex(target)
  }

  const handleKeyDown = k => {
    if ("ArrowDown" === k) {
      selectOption(+1)
    } else if ("ArrowUp" === k) {
      selectOption(-1)
    } else if ("Enter" === k) {
      setText(filteredOptions[optionIndex])
    } else {
    }
  }

  const handleOnChange = (val = "") => {
    setPrestine(false)
    setText(val)
  }

  return (
    <div className="relative w-44">
      <input
        type="text"
        className="w-full border-2 rounded p-2 h-8 border-violet-200"
        value={text}
        onChange={e => handleOnChange(e.target.value)}
        onKeyDown={e => handleKeyDown(e.key)}
      />
      <Select
        isPrestine={isPrestine}
        value={text}
        selected={filteredOptions[optionIndex]}
        options={filteredOptions}
        onChange={handleOnChange}
      />
    </div>
  )
}
