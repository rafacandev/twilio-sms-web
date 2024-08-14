import { useState, useRef, useEffect } from "react"
import { emptyFn } from "../../js/types"
import { DoubleRightOutlined, LoadingOutlined, Loading3QuartersOutlined } from "@ant-design/icons"
import { isEmpty } from "lodash"
import { select, selectOptions } from "../../ui/classes"

const Options = ({ options = [{ val: "", text: "" }] }) =>
  options.map((o, i) => (
    <option key={i} value={o.val} className={selectOptions}>
      {o.text}
    </option>
  ))

const Select = ({
  options = [{ val: "", text: "" }],
  selected = { val: "", text: "" },
  loading = true,
  onChange = emptyFn,
  expanded = false,
}) => {
  if (!expanded) return null
  if (options.length < 1) return null
  if (loading) {
    return (
      <div
        className={`absolute left-0 top-8 w-full bg-white border-2 border-violet-200 rounded h-10 flex justify-center items-center`}
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

const filterOptions = (options = [{ val: "", text: "" }], defaultValue = "", text = "") => {
  if (options.find(o => o.val === defaultValue)?.text === text) return options
  return options.filter(o => {
    const t = text.toLowerCase()
    return o.text.toLowerCase().includes(t) || o.val.toLowerCase().includes(t)
  })
}

export const SelectAutoComplete = ({
  options = [{ val: "", text: "" }],
  onChange = emptyFn,
  className = "",
  defaultValue = "",
  loading = true,
}) => {
  const [text, setText] = useState("")
  const [optionIndex, setSelectedIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef(null)
  const filteredOptions = filterOptions(options, defaultValue, text)

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      const match = options.find(o => o.val === defaultValue)
      if (match !== undefined) {
        setText(match.text)
      }
    }
  }, [setText, options, defaultValue])

  const selectOption = (direction = 0) => {
    const target = optionIndex + direction
    if (target >= filteredOptions.length || target < 0) return
    setSelectedIndex(target)
  }

  const handleInputOnChange = (val = "") => {
    setText(val)
  }

  const handleInputOnKeyDown = ev => {
    if ("ArrowDown" === ev.key) {
      ev.preventDefault()
      selectOption(+1)
    } else if ("ArrowUp" === ev.key) {
      ev.preventDefault()
      selectOption(-1)
    } else if ("Enter" === ev.key) {
      const t = filteredOptions[optionIndex].text
      setText(filteredOptions[optionIndex].text)
      setExpanded(false)
      onChange(t)
    } else {
      setExpanded(true)
    }
  }

  const handleInputOnFocus = () => {
    const match = options.find(o => {
      const t = text.toLowerCase()
      return o.text.toLowerCase() === t || o.val.toLowerCase() === t
    })
    if (match !== undefined) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  const handleInputArrowOnClick = () => {
    setExpanded(v => !v)
  }

  const handleSelectOnChange = (val = "") => {
    const t = filteredOptions.find(o => o.val === val).text
    setText(t)
    setExpanded(false)
    onChange(t)
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className="w-full border-2 rounded p-2 h-8 border-violet-200"
        value={text}
        onChange={e => handleInputOnChange(e.target.value)}
        onKeyDown={e => handleInputOnKeyDown(e)}
        onFocusCapture={handleInputOnFocus}
      />
      <DoubleRightOutlined
        className="absolute right-1 text-black text-[.6rem] pt-3 h-8"
        rotate="90"
        onClick={handleInputArrowOnClick}
      />
      <Select
        selected={filteredOptions[optionIndex]}
        options={filteredOptions}
        loading={loading}
        onChange={handleSelectOnChange}
        expanded={expanded}
      />
    </div>
  )
}
