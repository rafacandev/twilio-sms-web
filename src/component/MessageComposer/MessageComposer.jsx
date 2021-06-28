import {useState} from "react";
import "./MessageComposer.css"
import useSendTwilioMessage from "../../hook/useSendTwilioMessage";

const MessageComposer = ({phoneNumber = ''}) => {
  const [loading, setLoading] = useState(false)
  const [to, setTo] = useState('+')
  const [isToPristine, setIsToPristine] = useState(true)
  const [message, setMessage] = useState('')
  const [isMessagePristine, setIsMessagePristine] = useState(true);
  const toValidationPattern = '^\\+\\d{11}'
  const messageValidationPattern = '[\\w\\d]{3,}'

  const handleSendMessageNumberSuccess = (response) => {
    console.log('success', response)
  }

  const handleError = (err) => {
    console.log(err)
  }

  const handleMessageSentComplete = () => {
    console.log('complete')
    setLoading(false)
  }


  const sendMessage = useSendTwilioMessage({
    onSuccess: handleSendMessageNumberSuccess,
    onError: handleError,
    onComplete: handleMessageSentComplete
  })


  const handleOnSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    sendMessage({to: to, from: phoneNumber, body: message})
  }

  const handleToChange = (event) => {
    const v = '+' + event.target.value.replace(/\D/g, '')
    if (v.length < 13) {
      setTo(v)
    }
  }

  const handleMessageChange = (event) => {
    const v = event.target.value
    if (v.length < 200) {
      setMessage(v)
    }
  }

  const isValidTo = isToPristine || to.match(toValidationPattern)
  const toHint = () => {
    if (isToPristine) return 'Enter a phone number'
    if (isValidTo) return 'Valid phone number'
    return 'Phone number is invalid. It must contain the country followed by 10 digits'
  }

  const isValidMessage = isMessagePristine || message.match(messageValidationPattern)
  const messageHint = () => {
    if (isMessagePristine) return 'Enter a message'
    if (isValidMessage) return 'Valid message'
    return 'Min of 3 characters'
  }

  return <div>
    <form className="form-group" onSubmit={handleOnSubmit}>
      <fieldset disabled={loading}>
        <label className={`form-label ${isValidTo?'':'has-error'}`}>To:
          <input
            type="tel"
            className="form-input"
            placeholder="To phone number"
            required
            value={to}
            onChange={handleToChange}
            onBlur={() => setIsToPristine(false)}/>
          <span className="form-input-hint">{toHint()}</span>
        </label>

        <label className={`form-label ${isValidMessage?'':'has-error'}`}>From: {phoneNumber}
          <textarea
            className="form-input"
            placeholder="Message..."
            required
            rows="5"
            value={message}
            onChange={handleMessageChange}
            onBlur={() => setIsMessagePristine(false)}/>
          <span className="form-input-hint">{messageHint()}</span>
        </label>
      </fieldset>
      <div className="text-center m-2">
        <button className={`message-composer-submit btn btn-primary ${loading ? 'loading' : ''}`} type="submit">Send</button>
      </div>
    </form>
  </div>
}

export default MessageComposer