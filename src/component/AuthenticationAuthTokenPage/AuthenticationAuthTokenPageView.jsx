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
      <span>Auth Token</span>
      <input
        className="block w-full"
        type="password"
        name="AuthToken"
        value={authToken}
        autoComplete="on"
        placeholder="Aut Token located at your Twilio Console"
        required
        disabled={loading}
        onChange={e => onAuthTokenChange(e.target.value)}
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
