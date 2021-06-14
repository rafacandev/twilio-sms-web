import ErrorLabel from "../ErrorLabel/ErrorLabel";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import style from "./MessagesPageStyle";

const MessagesPageView = ({ error = null,
                            accountName = 'Unknown account',
                            phoneNumbers = []}) => {

  const PhoneNumberSelector = () => (
    <div style={style.phoneNumberContainer}>
      <div className="text-center" style={style.phoneNumberLabel}>
        Select a phone number <br/>
        from your account: <br/>
        {accountName}
      </div>
      <div className="form-group">
        <div>
          <select className="form-select" multiple="multiple" size="5" style={style.phoneNumberSelect}>
            {phoneNumbers.map(ph => <option key={ph}>{ph}</option>)}
          </select>
          <div className="text-small text-center">Total: {phoneNumbers.length}</div>
        </div>
      </div>
    </div>
  )

  return (
    <DefaultLayout>
      <h4>Messages</h4>
      <ErrorLabel error={error}/>
      <PhoneNumberSelector/>
    </DefaultLayout>
  )
}

export default MessagesPageView