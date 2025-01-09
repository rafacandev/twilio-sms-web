import { AuthenticationMethod } from "../../context/AuthenticationProvider"
import { useNavigate } from "react-router-dom"
import { AuthenticationMethodCard } from "../AuthenticationMethodCard/AuthenticationMethodCard"
import { LayoutWithoutNavBar } from "../Layout/Layout"

export const AuthenticationPage = () => {
  const navigate = useNavigate()

  const handleAuthMethod = (method = AuthenticationMethod.NONE) => {
    if (method === AuthenticationMethod.AUTH_TOKEN) {
      navigate("/authentication-token")
    } else if (method === AuthenticationMethod.API_KEY) {
      navigate("/authentication-api-key")
    }
  }

  return (
    <LayoutWithoutNavBar>
      <AuthenticationMethodCard onChange={handleAuthMethod} />
    </LayoutWithoutNavBar>
  )
}
