import { DoubleRightOutlined } from "@ant-design/icons"

import { useState, useEffect, useRef } from "react"
import { emptyFn } from "../../js/types"

const Option = (o = "option", isActive = false, onClick = emptyFn, onMouseOver = emptyFn) => (
  <div
    key={o}
    className={`${isActive ? "bg-gray-200" : "bg-white"}  h-8 flex items-center`}
    onMouseOver={onMouseOver}
    onClick={onClick}
  >
    {o}
  </div>
)

export const Combobox = ({ options = [] }) => {
  const rootRef = useRef(null)
  const [focus, setFocus] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const focusUp = () => {
    const targetFocus = focus - 1
    if (targetFocus < 0) return
    setFocus(targetFocus)
  }

  const focusDown = () => {
    const targetFocus = focus + 1
    if (targetFocus >= options.length) return
    setFocus(targetFocus)
  }

  const handleOptionOnClick = (optionIndex = 0) => {
    setOpen(false)
    setFocus(optionIndex)
    setInputValue(options[optionIndex])
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
      setInputValue(options[focus])
    } else {
    }
  }

  const handleInputOnFocus = () => {
    setOpen(true)
    if (options.includes(inputValue)) {
      setFocus(options.indexOf(inputValue))
    } else {
      setFocus(-1)
    }
  }

  useEffect(() => {
    console.log("event click")
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
    <div ref={rootRef} className="w-36">
      <div className="w-36 flex">
        <input
          type="text"
          className="mb-2 w-36"
          value={inputValue}
          onChange={e => setInputValue(e.value)}
          onFocus={handleInputOnFocus}
          onKeyDown={e => handleInputOnKeyDown(e)}
        />
        <DoubleRightOutlined
          className="text-black text-[.6rem] relative right-4 top-1"
          rotate={isOpen ? "-90" : "90"}
        />
      </div>

      {isOpen && (
        <div className="bg-pink-300 absolute z-10 w-36">
          <div className="border-purple-300 border h-56 overflow-y-auto divide-y divide-dashed z-10">
            {options.map((o, i) =>
              Option(
                o,
                i === focus,
                () => handleOptionOnClick(i),
                () => handleOptionOnMouseOver(i),
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
