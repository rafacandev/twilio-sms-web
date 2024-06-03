import { AuthenticationMethod } from "../../context/AuthenticationProvider"
import DefaultLayout from "../DefaultLayout/DefaultLayout"
import { useHistory } from "react-router-dom"
import AuthenticationMethodCard from "../AuthenticationMethodCard/AuthenticationMethodCard"

const AuthenticationPage = () => {
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

export default AuthenticationPage
