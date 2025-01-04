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
    className="grid grid-cols-1 gap-3"
    onSubmit={e => {
      e.preventDefault()
      onSignIn()
    }}
  >
    <label>
      <span>Account SID</span>
      <input
        className="block w-full"
        type="text"
        name="AccountSid"
        value={accountSid}
        autoComplete="on"
        placeholder="Account SID located at your Twilio Console"
        required
        disabled={loading}
        onChange={e => onAccountSidChange(e.target.value)}
      />
    </label>
    <label>
      <span>Api Key</span>
      <input
        className="block w-full"
        type="text"
        name="ApiKey"
        value={apiKey}
        autoComplete="on"
        placeholder="API Key located at your Twilio Console"
        required
        disabled={loading}
        onChange={e => onApiKeyChange(e.target.value)}
      />
    </label>
    <label>
      <span>Api Secret</span>
      <input
        className="block w-full"
        type="password"
        name="ApiSecret"
        value={apiSecret}
        autoComplete="on"
        placeholder="API Secret for you API Key"
        required
        disabled={loading}
        onChange={e => onApiSecretChange(e.target.value)}
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
  </form>
)
