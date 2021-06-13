import axios from "axios";

const useGetTwilioAccounts = ({onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {
  const getAccounts = ({accountSid, authToken}) => {
    axios.get('https://api.twilio.com/2010-04-01/Accounts.json',
      {
        auth: { username: accountSid, password: authToken }
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return getAccounts
}

export default useGetTwilioAccounts