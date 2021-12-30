import React, {useContext, useState} from "react";

/**
 * Types of authentication
 * @enum {string}
 */
export const AuthenticationType = {
  AUTH_TOKEN: 'auth-token',
  API_KEY: 'api-key',
  NONE: ''
}

/**
 * Authentication data
 */
export class Authentication {
  /**
   * @param {string} accountSid
   * @param {string} authToken
   * @param {string} apiKey
   * @param {string} apiSecret
   * @param {AuthenticationType} type
   */
  constructor(accountSid='',
              authToken='',
              apiKey='',
              apiSecret='',
              type= AuthenticationType.NONE) {
    this.accountSid = accountSid
    this.authToken = authToken
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.type = type
  }
}

/**
 * @param {Authentication} authentication
 */
export const toCredentials = (authentication) => {
  switch (authentication.type) {
    case AuthenticationType.API_KEY:
      return {username: authentication.apiKey, password: authentication.apiSecret}
    case AuthenticationType.AUTH_TOKEN:
      return {username: authentication.accountSid, password: authentication.authToken}
    default:
      return {username: '', password: ''}
  }
}

const AuthenticationReadContext = React.createContext({})
const AuthenticationWriteContext = React.createContext(p => {})

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
