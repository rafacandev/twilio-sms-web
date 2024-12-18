import { InputField } from "../InputField/InputField"

const loadingClassName = (loading = false) => (loading ? "loading" : "")

export const AuthenticationAuthTokenView = ({
  accountSid = "",
  authToken = "",
  loading = false,
  onAccountSidChange = () => {},
  onAuthTokenChange = () => {},
  onCancel = () => {},
  onSignIn = () => {},
}) => (
  <form
    onSubmit={e => {
      e.preventDefault()
      onSignIn()
    }}
  >
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
    <div className="flex justify-end gap-3">
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button className={loadingClassName(loading)} type="submit">
        Sign-in
      </button>
    </div>
  </form>
)
