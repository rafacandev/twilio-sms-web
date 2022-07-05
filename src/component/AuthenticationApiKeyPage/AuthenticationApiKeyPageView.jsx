import InputField from "../InputField/InputField";

const AuthenticationApiKeyForm = ({ accountSid='', apiKey='', apiSecret='', loading=false,
                      onAccountSidChange=()=>{}, onApiKeyChange=()=>{}, onApiSecretChange=()=>{}, onCancel=()=>{}, onSignIn=()=>{} }) => (
  <form onSubmit={e => {
    e.preventDefault()
    onSignIn()
  }}>
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
      type="text"
      name="ApiKey"
      label="API Key"
      value={apiKey}
      autoComplete="api-key"
      placeholder="API Key located at your Twilio Console"
      isRequired={true}
      isEnabled={!loading}
      onChange={onApiKeyChange}
    />
    <InputField
      type="password"
      name="ApiSecret"
      label="API Secret"
      value={apiSecret}
      autoComplete='api-secret'
      placeholder="API Secret for your API Key"
      isRequired={true}
      isEnabled={!loading}
      onChange={onApiSecretChange}
    />
    <div className="buttons-container">
      <button className="btn btn-secondary" id="AUTHENTICATION-API-KEY-CANCEL" type="button" onClick={onCancel}>Cancel</button>
      <button className="btn btn-primary" id="AUTHENTICATION-API-KEY-SIGN-IN" type="submit">Sign-in</button>
    </div>
  </form>
)

export default AuthenticationApiKeyForm
