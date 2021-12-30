import axios from "axios";

/**
 * Account information
 */
export class AccountInfo {
  /**
   * @param {string} name
   * @param {string} type
   * @param {string} status
   * @param {Date} dateCreated
   * @param {Date} dateUpdated
   */
  constructor(name='', type='', status='', dateCreated=new Date(), dateUpdated=new Date()) {
    this.name = name
    this.type = type
    this.status = status
    this.dateCreated = dateCreated
    this.dateUpdated = dateUpdated
  }
}

const useGetTwilioAccount = ({onSuccess=()=>{}, onError=()=>{}, onComplete=()=>{}}) => {
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
