import { AuthenticationMethod } from "../../context/AuthenticationProvider"
import { useHistory } from "react-router-dom"
import { DefaultLayout } from "../DefaultLayout/DefaultLayout"
import { AuthenticationMethodCard } from "../AuthenticationMethodCard/AuthenticationMethodCard"

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
    <DefaultLayout>
      <h4>Authentication</h4>
      <AuthenticationMethodCard onChange={handleAuthMethod} />
    </DefaultLayout>
  )
}
