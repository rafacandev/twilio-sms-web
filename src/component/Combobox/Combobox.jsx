import { CaretDownFilled, StepBackwardFilled } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import { emptyFn } from "../../js/types"

const filterOptions = (options = [], value = "") =>
  options.includes(value) ? options : options.filter(o => o.includes(value))

const Input = ({
  loading = true,
  value = "",
  pattern = null,
  placeholder = null,
  disabled = false,
  onChange = emptyFn,
  onKeyDown = emptyFn,
}) => {
  if (loading) return <input type="text" className="w-full animate-pulse" value="Loading..." disabled />
  return (
    <input
      type="text"
      className="w-full"
      value={value}
      pattern={pattern}
      placeholder={placeholder}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => onKeyDown(e)}
    />
  )
}

const Option = ({ option = "option", isActive = false, onClick = emptyFn, onMouseOver = emptyFn } = {}) => {
  const ref = useRef()
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ block: "nearest", inline: "start" })
    }
  }, [isActive])
  return (
    <div
      ref={ref}
      className={`${isActive ? "bg-gray-200" : "bg-white"} h-10 flex items-center`}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      {option}
    </div>
  )
}

/**
 * Combobox component providing an accessible and interactive dropdown menu
 * for selecting options from a list. It supports keyboard navigation,
 * mouse interaction, and displays a dynamic dropdown based on focus and input.
 *
 * @component
 * @param {Object} props - The props object for the Combobox component.
 * @param {string} [props.value=""] - The currently selected or input value.
 * @param {Array<string>} [props.options=[]] - Array of options available for selection.
 * @param {Function} [props.onChange=emptyFn] - Callback function triggered when the value changes.
 * @returns {JSX.Element} A JSX element representing the Combobox.
 *
 * @example
 * // Example usage of Combobox
 * import { Combobox } from './Combobox';
 *
 * function App() {
 *   const [value, setValue] = useState('');
 *   const options = ['Option 1', 'Option 2', 'Option 3'];
 *
 *   return (
 *     <Combobox
 *       value={value}
 *       options={options}
 *       onChange={(selectedValue) => setValue(selectedValue)}
 *     />
 *   );
 * }
 */
export const Combobox = ({
  options = [],
  loading = false,
  pattern = null,
  placeholder = null,
  disabled = false,
  value = "",
  onChange = emptyFn,
  onSelect = emptyFn,
}) => {
  const rootRef = useRef(null)
  const [focus, setFocus] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const filteredOptions = filterOptions(options, value)

  const focusUp = () => {
    const targetFocus = focus - 1
    if (targetFocus < 0) return
    setFocus(targetFocus)
  }

  const focusDown = () => {
    const targetFocus = focus + 1
    if (targetFocus >= filteredOptions.length) return
    setFocus(targetFocus)
  }

  const handleOptionOnClick = (optionIndex = 0) => {
    setOpen(false)
    setFocus(optionIndex)
    const target = filteredOptions[optionIndex]
    onChange(target)
    onSelect(target)
  }

  const handleOptionOnMouseOver = (optionIndex = 0) => {
    setFocus(optionIndex)
  }

  const handleInputOnKeyDown = ev => {
    setOpen(true)
    if ("ArrowDown" === ev.key) {
      ev.preventDefault()
      focusDown()
    } else if ("ArrowUp" === ev.key) {
      ev.preventDefault()
      focusUp()
    } else if ("Enter" === ev.key) {
      ev.preventDefault()
      const target = filteredOptions[focus] ?? ""
      onChange(target)
      onSelect(target)
      setOpen(false)
    } else if ("Tab" === ev.key) {
      setOpen(false)
    }
  }

  const handleInputOnFocus = () => {
    setOpen(true)
    if (filteredOptions.includes(value)) {
      setFocus(filteredOptions.indexOf(value))
    } else {
      setFocus(-1)
    }
  }

  useEffect(() => {
    const handleWindowOnClick = event => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    window.addEventListener("click", handleWindowOnClick)
    return () => {
      window.removeEventListener("click", handleWindowOnClick)
    }
  }, [setOpen])

  return (
    <div ref={rootRef} className={`relative`}>
      <label className="w-full flex" onFocus={handleInputOnFocus}>
        <Input
          loading={loading}
          value={value}
          pattern={pattern}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={handleInputOnKeyDown}
          disabled={disabled}
        />
        <span className="relative w-0 h-0">
          {!isOpen && <CaretDownFilled className="absolute right-1 top-3 cursor-text text-gray-500" />}
          {isOpen && <StepBackwardFilled className="absolute right-1 top-3 cursor-text text-gray-500" rotate="-90" />}
        </span>
      </label>
      {!loading && isOpen && (
        <div className="absolute z-10 mt-1 w-full">
          <div className="bg-white border-gray-300 border-2 h-60 overflow-y-auto divide-y-2 divide-dotted">
            {filteredOptions.map((o, i) => (
              <Option
                key={o}
                option={o}
                isActive={i === focus}
                onClick={() => handleOptionOnClick(i)}
                onMouseOver={() => handleOptionOnMouseOver(i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
