import { AuthenticationMethod } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import { AuthenticationMethodCard } from "../AuthenticationMethodCard/AuthenticationMethodCard"
import { DockedLayoutBlankNavBar } from "../DockedLayout/DockedLayout"

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
    <DockedLayoutBlankNavBar>
      <AuthenticationMethodCard onChange={handleAuthMethod} />
    </DockedLayoutBlankNavBar>
  )
}
