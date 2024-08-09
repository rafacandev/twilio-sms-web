import { useState, useRef, useEffect } from "react"
import { emptyFn } from "../../js/types"
import { DoubleRightOutlined } from "@ant-design/icons"
import { isEmpty } from "lodash"

const Options = ({ options = [{ val: "", text: "" }] }) =>
  options.map((o, i) => (
    <option key={i} value={o.val} className="px-2 py-1.5 hover:via-violet-200">
      {o.text}
    </option>
  ))

const Select = ({
  options = [{ val: "", text: "" }],
  selected = { val: "", text: "" },
  isPrestine = true,
  onChange = emptyFn,
}) => {
  if (isPrestine) return null
  if (options.length < 1) return null
  return (
    <>
      <select
        size="7"
        value={selected.val}
        className={`absolute left-0 top-8 w-full border-2 rounded border-violet-200 bg-white`}
        onChange={ev => onChange(ev.target.value)}
      >
        <Options options={options} />
      </select>
    </>
  )
}

export const SelectAutoComplete = ({
  options = [{ val: "", text: "" }],
  onChange = emptyFn,
  className = "",
  defaultValue = "",
}) => {
  const [text, setText] = useState("")
  const [optionIndex, setSelectedIndex] = useState(0)
  const [isPrestine, setPrestine] = useState(true)
  const inputRef = useRef(null)

  const filteredOptions = options.filter(o => {
    const t = text.toLowerCase()
    return o.text.toLowerCase().includes(t) || o.val.toLowerCase().includes(t)
  })

  const selectOption = (direction = 0) => {
    const target = optionIndex + direction
    if (target >= filteredOptions.length || target < 0) return
    setSelectedIndex(target)
  }

  const handleOnChangeSelect = (val = "") => {
    setPrestine(true)
    const t = filteredOptions.find(o => o.val === val).text
    setText(t)
    onChange(t)
  }

  const handleOnChangeInput = (val = "") => {
    setPrestine(false)
    setText(val)
  }

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      const match = options.find(o => o.val === defaultValue)
      if (match !== undefined) {
        setText(match.text)
      }
    }
  }, [setText, options, defaultValue])

  const handleOnKeyDownInput = ev => {
    if ("ArrowDown" === ev.key) {
      ev.preventDefault()
      selectOption(+1)
    } else if ("ArrowUp" === ev.key) {
      ev.preventDefault()
      selectOption(-1)
    } else if ("Enter" === ev.key) {
      if (!isPrestine) {
        const t = filteredOptions[optionIndex].text
        setText(filteredOptions[optionIndex].text)
        onChange(t)
      }
      setPrestine(true)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className="w-full border-2 rounded p-2 h-8 border-violet-200"
        value={text}
        onChange={e => handleOnChangeInput(e.target.value)}
        onKeyDown={e => handleOnKeyDownInput(e)}
        onFocusCapture={e => setPrestine(false)}
      />
      <DoubleRightOutlined
        className="absolute right-1 top-3 bg-white text-black text-[.6rem]"
        rotate="90"
        onClick={e => inputRef.current.focus()}
      />
      <Select
        isPrestine={isPrestine}
        selected={filteredOptions[optionIndex]}
        options={filteredOptions}
        onChange={handleOnChangeSelect}
      />
    </div>
  )
}
