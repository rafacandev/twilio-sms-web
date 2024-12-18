import { InputField } from "../InputField/InputField"

const loadingClassName = (loading = false) => (loading ? "loading" : "")

export const AuthenticationApiKeyView = ({
  accountSid = "",
  apiKey = "",
  apiSecret = "",
  loading = false,
  onAccountSidChange = () => {},
  onApiKeyChange = () => {},
  onApiSecretChange = () => {},
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
      autoComplete="api-secret"
      placeholder="API Secret for your API Key"
      isRequired={true}
      isEnabled={!loading}
      onChange={onApiSecretChange}
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
