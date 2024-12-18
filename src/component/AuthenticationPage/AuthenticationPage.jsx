import { AuthenticationMethod } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import { AuthenticationMethodCard } from "../AuthenticationMethodCard/AuthenticationMethodCard"
import { LayoutWithoutNavBar } from "../Layout/Layout"

export const AuthenticationPage = () => {
  const history = useHistory()

  const handleAuthMethod = (method = AuthenticationMethod.NONE) => {
    if (method === AuthenticationMethod.AUTH_TOKEN) {
      history.push("/authentication-token")
    } else if (method === AuthenticationMethod.API_KEY) {
      history.push("/authentication-api-key")
    }
  }

  return (
    <LayoutWithoutNavBar>
      <AuthenticationMethodCard onChange={handleAuthMethod} />
    </LayoutWithoutNavBar>
  )
}
