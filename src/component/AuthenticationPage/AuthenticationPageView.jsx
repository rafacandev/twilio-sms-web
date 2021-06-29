import InputField from "../InputField/InputField";

export const AuthenticateForm = ({ accountSid = '',
                                   authToken = '',
                                   loading = true,
                                   onAccountSidChange = () => {},
                                   onAuthTokenChange = () => {},
                                   onSubmit = () => {}}) => (
  <>
    <form onSubmit={onSubmit}>
      <InputField
        type="text"
        name="AccountSid"
        label="Account SID"
        value={accountSid}
        placeholder="Enter your Twilio 'Account SID' located at your Twilio Console"
        isEnabled={!loading}
        onChange={onAccountSidChange}
      />
      <InputField
        type="password"
        name="AuthToken"
        placeholder="Enter your Twilio 'Auth Token' located at your Twilio Console"
        value={authToken}
        isEnabled={!loading}
        onChange={onAuthTokenChange}
      />
      <div className="text-center m-2">
        <button className={`btn btn-primary ${loading ? 'loading' : ''}`} type="submit">Authenticate</button>
      </div>
    </form>
  </>
)

export const AccountDetails = ({accountInfo = ''}) => {
  if (Object.keys(accountInfo).length === 0) return null
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