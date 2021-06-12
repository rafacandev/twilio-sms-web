import React, {useContext, useState} from "react";

const AuthenticationReadContext = React.createContext({})
const AuthenticationWriteContext = React.createContext(() => {})

export const useAuthentication = () => {
  const value = useContext(AuthenticationReadContext)
  const setValue = useContext(AuthenticationWriteContext)
  return [value, setValue]
}

export const AuthenticationProvider = ({children}) => {
  const [value, setValue] = useState({})
  return (
    <AuthenticationReadContext.Provider value={value}>
      <AuthenticationWriteContext.Provider value={v => setValue(v)}>
        {children}
      </AuthenticationWriteContext.Provider>
    </AuthenticationReadContext.Provider>
  )
}
