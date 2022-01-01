import InputField from "../InputField/InputField";

const AuthenticationTokenForm = ({ accountSid='', authToken='', loading=false,
                         onAccountSidChange=()=>{}, onAuthTokenChange=()=>{}, onCancel=()=>{}, onSignIn=()=>{} }) => (
  <form onSubmit={onSignIn}>
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
      <button className="btn btn-primary" type="submit">Sing-in</button>
    </div>
  </form>
)

export default AuthenticationTokenForm
