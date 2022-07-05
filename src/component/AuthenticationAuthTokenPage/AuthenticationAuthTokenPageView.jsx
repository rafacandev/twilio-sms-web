import InputField from "../InputField/InputField";

const loadingClassName = (loading = false) => loading ? 'loading' : ''

const AuthenticationAuthTokenForm = ({ accountSid='', authToken='', loading=false,
                         onAccountSidChange=()=>{}, onAuthTokenChange=()=>{}, onCancel=()=>{}, onSignIn=()=>{} }) => (
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
      <button className="btn btn-secondary" id="AUTHENTICATION-TOKEN-CANCEL" type="button" onClick={onCancel}>Cancel</button>
      <button className={`btn btn-primary ${loadingClassName(loading)}`} id="AUTHENTICATION-TOKEN-SIGN-IN" type="submit">Sign-in</button>
    </div>
  </form>
)

export default AuthenticationAuthTokenForm
