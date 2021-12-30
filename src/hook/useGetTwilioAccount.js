import axios from "axios";
import {toCredentials} from "../context/AuthenticationProvider";

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

  /**
   * @param {Authentication} authentication
   */
  const getAccount = (authentication) => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}.json`
    axios.get(url,
      {
        auth: toCredentials(authentication)
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error))
      .then(() => onComplete())
  }

  return getAccount
}

export default useGetTwilioAccount
