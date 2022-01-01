import {AuthenticationMethod} from "../../context/AuthenticationProvider";
import './AuthenticationPage.css'
import AuthenticationMethodCard from "../AuthenticationMethodCard/AuthenticationMethodCard";
import AuthenticationTokenForm from "../AuthenticationAuthTokenForm/AuthenticationAuthTokenFormView";
import AuthenticationApiKeyForm from "../AuthenticationApiKeyForm/AuthenticationApiKeyFormView";

export const AuthenticateForm = ({ accountSid = '',
                                   authToken = '',
                                   apiKey = '',
                                   apiSecret = '',
                                   authMethod= AuthenticationMethod.NONE,
                                   loading = true,
                                   onAccountSidChange = () => {},
                                   onAuthTokenChange = () => {},
                                   onApiKeyChange = () => {},
                                   onApiSecretChange = () => {},
                                   onAuthTypeChange = () => {},
                                   onSignIn = () => {}}) => (
  <>
    {authMethod === AuthenticationMethod.NONE &&
      <AuthenticationMethodCard onChange={onAuthTypeChange}/>
    }

    {authMethod === AuthenticationMethod.AUTH_TOKEN &&
      <AuthenticationTokenForm
        accountSid={accountSid}
        authToken={authToken}
        loading={loading}
        onAccountSidChange={onAccountSidChange}
        onAuthTokenChange={onAuthTokenChange}
        onCancel={() => onAuthTypeChange(AuthenticationMethod.NONE)}
        onSignIn={() => onSignIn(AuthenticationMethod.AUTH_TOKEN)} />
    }

    {authMethod === AuthenticationMethod.API_KEY &&
      <AuthenticationApiKeyForm
        accountSid={accountSid}
        apiKey={apiKey}
        apiSecret={apiSecret}
        loading={loading}
        onAccountSidChange={onAccountSidChange}
        onApiKeyChange={onApiKeyChange}
        onApiSecretChange={onApiSecretChange}
        onCancel={() => onAuthTypeChange(AuthenticationMethod.NONE)}
        onSignIn={() => onSignIn(AuthenticationMethod.API_KEY)} />
    }
  </>
)
