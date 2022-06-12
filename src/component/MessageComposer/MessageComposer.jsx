import {useState, useEffect} from "react";
import "./MessageComposer.css"
import useSendTwilioMessage from "../../hook/useSendTwilioMessage";
import SuccessLabel from "../SuccessLabel/SuccessLabel";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import {useComposerContext} from "../../context/ComposerProvider"

const MessageComposer = ({phoneNumber = ''}) => {
  const [composerContext, setComposerContext] = useComposerContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMessageSent, setMessageSent] = useState(false)
  const [to, setTo] = useState(composerContext)
  const [message, setMessage] = useState('')
  const toValidationPattern = '^\\+\\d{11}'
  const messageValidationPattern = '[\\w\\d]{3,}'

  const handleSendMessageSuccess = (response) => {
    setMessageSent(true)
    setTimeout(()=> setMessageSent(false), 5000)
  }

  const handleError = (err) => {
    setError(err)
  }

  const handleMessageSentComplete = () => {
    setLoading(false)
  }

  const sendMessage = useSendTwilioMessage({
    onSuccess: handleSendMessageSuccess,
    onError: handleError,
    onComplete: handleMessageSentComplete
  })

  const handleOnSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    sendMessage({to: to, from: phoneNumber, body: message})
    setComposerContext(to)
  }

  const handleToChange = (v) => {
    if (v.length > 0) {
      v = '+' + v.replace(/\D/g, '')
    }
    if (v.length < 13) {
      setTo(v)
      setComposerContext(v)
    }
  }

  const handleMessageChange = (v) => {
    if (v.length < 200) {
      setMessage(v)
    }
  }

  useEffect(()=> {
    setComposerContext('')
  }, [setComposerContext])

  return <div>
    <ErrorLabel error={error}/>
    <form className="form-group" onSubmit={handleOnSubmit}>
      <fieldset disabled={loading}>
        <InputField
          label="To"
          type='tel'
          value={to}
          onChange={handleToChange}
          validation={v => v.match(toValidationPattern)}
          placeholder="Recipient's phone number"
          invalidHint="Phone number is invalid, it must contain the country code followed by 10 digits"
          isRequired={true}
        />
        <TextAreaField
          label="Message"
          value={message}
          isRequired={true}
          placeholder={`Enter the message to sent to: ${to} from: ${phoneNumber}`}
          validHint={`This message is going to be sent to: ${to} from: ${phoneNumber}`}
          invalidHint="Invalid message, it must be between 3 and 200 characters"
          rows='3'
          validation={v => v.match(messageValidationPattern)}
          onChange={handleMessageChange}
        />
      </fieldset>
      <div className="text-center m-2">
        <button className={`message-composer-submit btn btn-primary ${loading ? 'loading' : ''}`} type="submit">Send</button>
      </div>
    </form>
    <div className="text-center">
      {isMessageSent && <SuccessLabel text="Message sent successfully."/>}
    </div>
  </div>
}

export default MessageComposer
