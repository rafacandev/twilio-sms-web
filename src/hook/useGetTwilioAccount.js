import axios from "axios";

const useGetTwilioAccount = ({onSuccess = () => {},
                                onError = () => {},
                                onComplete = () => {}
                              }) => {
  const getAccount = ({accountSid, authToken}) => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}.json`
    axios.get(url,
      {
        auth: { username: accountSid, password: authToken }
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return getAccount
}

export default useGetTwilioAccount