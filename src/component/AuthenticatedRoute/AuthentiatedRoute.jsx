import { Navigate } from "react-router-dom"
import { useAuthentication } from "../../context/AuthenticationProvider"

export const AuthenticatedRoute = ({ children }) => {
  const [authentication] = useAuthentication()

  if (!authentication.accountSid && !authentication.accountSid !== "") {
    return <Navigate to="/authentication" replace />
  }

  return children
}
