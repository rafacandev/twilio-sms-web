import InputField from "../InputField/InputField";
import {AuthenticationType} from "../../context/AuthenticationProvider";
import {AccountInfo} from "../../hook/useGetTwilioAccount";
import './AuthenticationPage.css'
import AuthenticationMethodCard from "../AuthenticationMethodCard/AuthenticationMethodCard";

const AuthTokenForm = ({ accountSid='', authToken='', loading=false,
                         onAccountSidChange=()=>{}, onAuthTokenChange=()=>{}, onCancel=()=>{}, onSignIn=()=>{} }) => (
  <form>
    <InputField
      type="text"
      name="AccountSid"
      label="Account SID"
      value={accountSid}
      autoComplete="account-sid"
      placeholder="Account SID located at your Twilio Console"
      isRequired={true}
      isEnabled={!loading}
      onChange={onAccountSidChange}
    />
    <InputField
      type="password"
      name="AuthToken"
      label="Auth Token"
      value={authToken}
      autoComplete="auth-token"
      placeholder="Auth Token located at your Twilio Console"
      isRequired={true}
      isEnabled={!loading}
      onChange={onAuthTokenChange}
    />
    <div className="buttons-container">
      <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
      <button className="btn btn-primary" type="button" onClick={onSignIn}>Sing-in</button>
    </div>
  </form>
)

const ApiKeyForm = ({ accountSid='', apiKey='', apiSecret='', loading=false,
                      onAccountSidChange=()=>{}, onApiKeyChange=()=>{}, onApiSecretChange=()=>{}, onCancel=()=>{}, onSignIn=()=>{} }) => (
  <form>
    <InputField
      type="text"
      name="AccountSid"
      label="Account SID"
      autoComplete="account-sid"
      value={accountSid}
      placeholder="Account SID located at your Twilio Console"
      isRequired={true}
      isEnabled={!loading}
      onChange={onAccountSidChange}
    />
    <InputField
      type="text"
      name="ApiKey"
      label="API Key"
      value={apiKey}
      autoComplete="api-key"
      placeholder="API Key located at your Twilio Console"
      isEnabled={!loading}
      onChange={onApiKeyChange}
    />
    <InputField
      type="password"
      name="ApiSecret"
      autoComplete='api-secret'
      label="API Secret"
      placeholder="API Secret for your API Key"
      value={apiSecret}
      isEnabled={!loading}
      onChange={onApiSecretChange}
    />
    <div className="buttons-container">
      <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
      <button className="btn btn-primary" type="button" onClick={onSignIn}>Sing-in</button>
    </div>
  </form>
)

export const AuthenticateForm = ({ accountSid = '',
                                   authToken = '',
                                   apiKey = '',
                                   apiSecret = '',
                                   authType= AuthenticationType.NONE,
                                   loading = true,
                                   onAccountSidChange = () => {},
                                   onAuthTokenChange = () => {},
                                   onApiKeyChange = () => {},
                                   onApiSecretChange = () => {},
                                   onAuthTypeChange = () => {},
                                   onSubmit = () => {}}) => (
  <>
    {authType === AuthenticationType.NONE &&
      <AuthenticationMethodCard onChange={onAuthTypeChange}/>
    }

    {authType === AuthenticationType.AUTH_TOKEN &&
      <AuthTokenForm
        accountSid={accountSid}
        authToken={authToken}
        loading={loading}
        onAccountSidChange={onAccountSidChange}
        onAuthTokenChange={onAuthTokenChange}
        onCancel={() => onAuthTypeChange(AuthenticationType.NONE)}
        onSignIn={() => onSubmit(AuthenticationType.AUTH_TOKEN)} />
    }

    {authType === AuthenticationType.API_KEY &&
      <ApiKeyForm
        accountSid={accountSid}
        apiKey={apiKey}
        apiSecret={apiSecret}
        onApiKeyChange={onApiKeyChange}
        loading={loading}
        onApiSecretChange={onApiSecretChange}
        onCancel={() => onAuthTypeChange(AuthenticationType.NONE)}
        onSignIn={() => onSubmit(AuthenticationType.API_KEY)} />
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
