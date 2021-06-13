import {useHistory} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationProvider";
import DefaultLayout from "../DefaultLayout/DefaultLayout";

const MessagesPage = () => {
  const history = useHistory()
  const [authentication] = useAuthentication()
  const navigateToAuthenticationPage = () => history.push('/authentication')

  return <DefaultLayout>
    Account SID: {authentication.accountSid}<br/>
    Auth Token: {authentication.authToken}<br/>
    Info: {authentication.accountInfo?.name}<br/>
    <button onClick={navigateToAuthenticationPage}>Authenticate</button>
  </DefaultLayout>
}

export default MessagesPage