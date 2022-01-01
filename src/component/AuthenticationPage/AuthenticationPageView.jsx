import {AuthenticationMethod} from "../../context/AuthenticationProvider";
import {AccountInfo} from "../../hook/useGetTwilioAccount";
import './AuthenticationPage.css'
import AuthenticationMethodCard from "../AuthenticationMethodCard/AuthenticationMethodCard";
import AuthenticationTokenForm from "../AuthenticationAuthTokenForm/AuthenticationAuthTokenFormView";
import AuthenticationApiKeyForm from "../AuthenticationApiKeyForm/AuthenticationApiKeyFormView";

export const AuthenticateForm = ({ accountSid = '',
                                   authToken = '',
                                   apiKey = '',
                                   apiSecret = '',
                                   authType= AuthenticationMethod.NONE,
                                   loading = true,
                                   onAccountSidChange = () => {},
                                   onAuthTokenChange = () => {},
                                   onApiKeyChange = () => {},
                                   onApiSecretChange = () => {},
                                   onAuthTypeChange = () => {},
                                   onSubmit = () => {}}) => (
  <>
    {authType === AuthenticationMethod.NONE &&
      <AuthenticationMethodCard onChange={onAuthTypeChange}/>
    }

    {authType === AuthenticationMethod.AUTH_TOKEN &&
      <AuthenticationTokenForm
        accountSid={accountSid}
        authToken={authToken}
        loading={loading}
        onAccountSidChange={onAccountSidChange}
        onAuthTokenChange={onAuthTokenChange}
        onCancel={() => onAuthTypeChange(AuthenticationMethod.NONE)}
        onSignIn={() => onSubmit(AuthenticationMethod.AUTH_TOKEN)} />
    }

    {authType === AuthenticationMethod.API_KEY &&
      <AuthenticationApiKeyForm
        accountSid={accountSid}
        apiKey={apiKey}
        apiSecret={apiSecret}
        loading={loading}
        onAccountSidChange={onAccountSidChange}
        onApiKeyChange={onApiKeyChange}
        onApiSecretChange={onApiSecretChange}
        onCancel={() => onAuthTypeChange(AuthenticationMethod.NONE)}
        onSignIn={() => onSubmit(AuthenticationMethod.API_KEY)} />
    }
  </>
)

export const AccountDetails = ({accountInfo = new AccountInfo()}) => {
  if (!accountInfo || !accountInfo.status || accountInfo.status.length === 0)
    return <></>

  return (
    <div className="flex-centered" style={{marginTop: '2em'}}>
      <div className="card">
        <div className="card-header bg-success text-center">
          <h6>Authentication Success</h6>
        </div>
        <div className="card-body">
          <p className="text-small" style={{marginBottom: '.5em'}}>You are authenticated with the following account:</p>
          <span className="text-bold">Name: </span>{accountInfo.name}<br/>
          <span className="text-bold">Type: </span>{accountInfo.type}<br/>
          <span className="text-bold">Status: </span>{accountInfo.status}<br/>
          <span className="text-bold">Created: </span>{accountInfo.dateCreated}<br/>
          <span className="text-bold">Updated: </span>{accountInfo.dateUpdated}<br/>
        </div>
      </div>
    </div>
  )
}
