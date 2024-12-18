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
    <div className="buttons-container">
      <button
        className="border-2 rounded py-2 px-4 border-white invalid:border-red-500 bg-purple-900 text-white hover:bg-purple-700 active:bg-purple-950 float-right disabled:bg-gray-200 disabled:border-gray-300"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className={`border-2 rounded py-2 px-4 border-white invalid:border-red-500 bg-purple-900 text-white hover:bg-purple-700 active:bg-purple-950 float-right disabled:bg-gray-200 disabled:border-gray-300 ${loadingClassName(loading)}`}
        type="submit"
      >
        Sign-in
      </button>
    </div>
  </form>
)
