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
    <div className="flex flex-col space-y-2">
      <label>
        <span>Account SID</span>
        <input
          className="block w-full"
          type="text"
          name="AccountSid"
          value={accountSid}
          autoComplete="account-sid"
          placeholder="Account SID located at your Twilio Console"
          required
          disabled={loading}
          onChange={onAccountSidChange}
        />
      </label>
      <label>
        <span>Api Key</span>
        <input
          className="block w-full"
          type="text"
          name="ApiKey"
          value={apiKey}
          autoComplete="api-key"
          placeholder="API Key located at your Twilio Console"
          required
          disabled={loading}
          onChange={onApiKeyChange}
        />
      </label>
      <label>
        <span>Api Secret</span>
        <input
          className="block w-full"
          type="text"
          name="ApiSecret"
          value={apiSecret}
          autoComplete="api-secret"
          placeholder="API Secret for you API Key"
          required
          disabled={loading}
          onChange={onApiKeyChange}
        />
      </label>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={loadingClassName(loading)} type="submit">
          Sign-in
        </button>
      </div>
    </div>
  </form>
)
