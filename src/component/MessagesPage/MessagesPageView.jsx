import "./MessagesPage.css"
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import PhoneNumberSelector from "../PhoneNumberSelector/PhoneNumberSelector";
import MessageList from "../MessageList/MessageList";
import DefaultLayout from "../DefaultLayout/DefaultLayout";

const Tabs = () => (
  <div className="middle-tabs">
    <div className="middle-tabs-content">
      <ul className="tab tab-block">
        <li className="tab-item">
          <a href="#/phone-numbers" className="active">Messages</a>
        </li>
        <li className="tab-item">
          <a href="#/phone-numbers" className="">Compose</a>
        </li>
      </ul>
    </div>
  </div>
)

const MessagesPageView = ({ error = null,
                            loadingPhoneNumbers = true,
                            phoneNumber = '',
                            onError = () => {},
                            onPhoneNumberChange = () =>{}}) => (
  <DefaultLayout>
    <h4>Messages</h4>
    <ErrorLabel error={error}/>
    <PhoneNumberSelector onError={onError} onPhoneNumberChange={onPhoneNumberChange}/>
    {!loadingPhoneNumbers && <Tabs/>}
    {!loadingPhoneNumbers && <MessageList phoneNumber={phoneNumber}/>}
  </DefaultLayout>
)

export default MessagesPageView