import React, { useContext, useState } from "react"

/**
 * Types of authentication
 * @enum {string}
 */
export const AuthenticationMethod = {
  AUTH_TOKEN: "auth-token",
  API_KEY: "api-key",
  NONE: "",
}

export class Authentication {
  /**
   * @param {string} accountSid
   * @param {string} authToken
   * @param {string} apiKey
   * @param {string} apiSecret
   * @param {AuthenticationMethod} type
   */
  constructor(accountSid = "", authToken = "", apiKey = "", apiSecret = "", type = AuthenticationMethod.NONE) {
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
export const toCredentials = authentication => {
  switch (authentication.type) {
    case AuthenticationMethod.API_KEY:
      return {
        username: authentication.apiKey,
        password: authentication.apiSecret,
        type: authentication.type,
      }
    case AuthenticationMethod.AUTH_TOKEN:
      return {
        username: authentication.accountSid,
        password: authentication.authToken,
        type: authentication.type,
      }
    default:
      return new Authentication()
  }
}

/**
 * Maps authentication errors to more user-friendly error messages.
 *
 * @param {Error} err - The error object to map.
 * @returns {Error} - A new Error object with a more user-friendly message, or the original error if it doesn't match specific cases.
 */
export const mapAuthenticationError = err => {
  if (err instanceof Error && err.message === "Network Error") {
    return new Error("Incorrect credentials or unable to access your Twilio account")
  } else if (err instanceof Error && err.message === "Request failed with status code 401") {
    return new Error("Incorrect credentials")
  } else {
    return err
  }
}

const AuthenticationReadContext = React.createContext({})
const AuthenticationWriteContext = React.createContext(p => {})

/**
 * @returns {[Authentication, function(Authentication)]}
 */
export const useAuthentication = () => {
  const value = useContext(AuthenticationReadContext)
  const setValue = useContext(AuthenticationWriteContext)
  return [value, setValue]
}

export const AuthenticationProvider = ({ children }) => {
  const [value, setValue] = useState({})
  return (
    <AuthenticationReadContext.Provider value={value}>
      <AuthenticationWriteContext.Provider value={v => setValue(v)}>{children}</AuthenticationWriteContext.Provider>
    </AuthenticationReadContext.Provider>
  )
}
