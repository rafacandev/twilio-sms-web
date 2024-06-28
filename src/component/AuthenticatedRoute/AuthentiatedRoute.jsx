import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useAuthentication } from "../../context/AuthenticationProvider"

export const AuthenticatedRoute = ({ component, path, retirectTo }) => {
  const [authentication] = useAuthentication()

  if (!authentication?.accountSid) {
    return <Redirect to={retirectTo} />
  }

  return <Route component={component} path={path} />
}
