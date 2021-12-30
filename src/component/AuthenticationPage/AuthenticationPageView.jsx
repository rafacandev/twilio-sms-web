import InputField from "../InputField/InputField";
import {AuthenticationType} from "../../context/AuthenticationProvider";
import {AccountInfo} from "../../hook/useGetTwilioAccount";

export const AuthenticateForm = ({ accountSid = '',
                                   authToken = '',
                                   apiKey = '',
                                   apiSecret = '',
                                   loading = true,
                                   onAccountSidChange = () => {},
                                   onAuthTokenChange = () => {},
                                   onApiKeyChange = () => {},
                                   onApiSecretChange = () => {},
                                   onSubmit = () => {}}) => (
  <>
    <form>
      <InputField
        type="text"
        name="AccountSid"
        label="Account SID"
        value={accountSid}
        placeholder="Account SID located at your Twilio Console"
        isEnabled={!loading}
        onChange={onAccountSidChange}
      />

      <div className="divider text-center"/>

      <div className="columns">
        <div className="column">
          <InputField
            type="password"
            name="AuthToken"
            label="Auth Token"
            placeholder="Auth Token located at your Twilio Console"
            value={authToken}
            isEnabled={!loading}
            onChange={onAuthTokenChange}
          />
          <div className="text-center m-2">
            <button className={`btn btn-secondary ${loading ? 'loading' : ''}`} onClick={e => onSubmit(AuthenticationType.AUTH_TOKEN)}>Authenticate with AuthToken</button>
          </div>
        </div>
        <div className="divider-vert text-center" data-content="OR"/>
        <div className="column">
          <InputField
            type="text"
            name="ApiKey"
            label="API Key"
            value={apiKey}
            placeholder="API Key located at your Twilio Console"
            isEnabled={!loading}
            onChange={onApiKeyChange}
          />

          <InputField
            type="password"
            name="ApiSecret"
            label="API Secret"
            placeholder="API Secret for your API Key"
            value={apiSecret}
            isEnabled={!loading}
            onChange={onApiSecretChange}
          />
          <div className="text-center m-2">
            <button className={`btn btn-primary ${loading ? 'loading' : ''}`} onClick={e => onSubmit(AuthenticationType.API_KEY)}>Authenticate with API Key</button>
          </div>
        </div>
      </div>
    </form>
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
