import React, {useContext, useState} from "react";

const ComposerReadContext = React.createContext({})
const ComposerWriteContext = React.createContext(p => {})

export const useComposerContext = () => {
  const value = useContext(ComposerReadContext)
  const setValue = useContext(ComposerWriteContext)
  return [value, setValue]
}

export const ComposerProvider = ({children}) => {
  const [value, setValue] = useState('')
  return (
    <ComposerReadContext.Provider value={value}>
      <ComposerWriteContext.Provider value={v => setValue(v)}>
        {children}
      </ComposerWriteContext.Provider>
    </ComposerReadContext.Provider>
  )
}
