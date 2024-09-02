import { useState, useRef, useEffect } from "react"
import { emptyFn } from "../../js/types"
import { DoubleRightOutlined } from "@ant-design/icons"
import { Select } from "./Select"

const filterOptions = (options = [{ val: "", text: "" }], value = "default", text = "") => {
  if (options.find(o => o.val === value)?.text === text) return options
  return options.filter(o => {
    const t = text.toLowerCase()
    return o.text.toLowerCase().includes(t) || o.val.toLowerCase().includes(t)
  })
}

const optionByValue = (options = [{ val: "", text: "" }], val = "") => options.find(o => o.val === val)

export const SelectAutoComplete = ({
  options = [{ val: "", text: "" }],
  onChange = emptyFn,
  className = "",
  value = "default",
  defaultValue = "default",
  loading = false,
}) => {
  const [text, setText] = useState("")
  const [optionIndex, setSelectedIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef(null)
  const rootRef = useRef(null)
  const filteredOptions = filterOptions(options, value, text)

  useEffect(() => {
    const match = optionByValue(options, value)?.text
    if (match !== undefined) {
      setText(match)
    }

    const handleWindowOnClick = event => {
      if (!rootRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    window.addEventListener("click", handleWindowOnClick)

    return () => {
      window.removeEventListener("click", handleWindowOnClick)
    }
  }, [setText, options, value])

  useEffect(() => {
    const match = optionByValue(options, value)?.text
    if (match !== undefined) {
      setText(match)
    }
  }, [value, options])

  const selectOption = (direction = 0) => {
    const target = optionIndex + direction
    if (target >= filteredOptions.length || target < 0) return
    setSelectedIndex(target)
  }

  const handleInputOnChange = (val = "") => {
    setText(val)
    if (optionByValue(options, val) !== undefined) {
      onChange(val)
    }
  }

  const handleInputOnKeyDown = ev => {
    if ("ArrowDown" === ev.key) {
      ev.preventDefault()
      selectOption(+1)
    } else if ("ArrowUp" === ev.key) {
      ev.preventDefault()
      selectOption(-1)
    } else if ("Enter" === ev.key) {
      const { val, text } = filteredOptions[optionIndex]
      setExpanded(false)
      setText(text)
      onChange(val)
    } else {
      setExpanded(true)
    }
  }

  const handleInputOnFocus = () => {
    const match = options.find(o => {
      const t = text.toLowerCase()
      return o.text.toLowerCase() === t || o.val.toLowerCase() === t
    })
    if (match !== undefined && match.val !== defaultValue) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  const handleInputArrowOnClick = () => {
    setExpanded(v => !v)
  }

  const handleSelectOnChange = (val = "") => {
    const match = optionByValue(filteredOptions, val).text
    setText(match)
    setExpanded(false)
    onChange(val)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
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
