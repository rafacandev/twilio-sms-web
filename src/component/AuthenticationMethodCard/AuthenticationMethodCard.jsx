import { AuthenticationMethod } from "../../context/AuthenticationProvider"
import { emptyFn } from "../../js/types"

export const AuthenticationMethodCard = ({ onChange = emptyFn }) => (
  <div className="text-center mt-8">
    <div className="authentication-method-card-header">Authenticate with Twilio:</div>
    <button className="w-56 m-5" onClick={e => onChange(AuthenticationMethod.AUTH_TOKEN)}>
      AuthToken
    </button>
    <div className="flex items-center gap-2 justify-center m-3">
      <hr className="w-40 border-t-2 border-gray-300" />
      or
      <hr className="w-40 border-t-2 border-gray-300" />
    </div>

    <button className="w-56 m-5" onClick={e => onChange(AuthenticationMethod.API_KEY)}>
      Api Key
    </button>
  </div>
)
