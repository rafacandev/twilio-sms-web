import {useHistory} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationProvider";
import DefaultLayout from "../DefaultLayout/DefaultLayout";

const PhoneNumbersPage = () => {
  const history = useHistory()
  const [authentication] = useAuthentication()
  const navigateToAuthenticationPage = () => history.push('/authentication')

  return <DefaultLayout>
    Phone Numbers using Account SID: {authentication.accountSid} and Auth Token: {authentication.authToken}
    <button onClick={navigateToAuthenticationPage}>Authenticate</button>
  </DefaultLayout>
}

export default PhoneNumbersPage