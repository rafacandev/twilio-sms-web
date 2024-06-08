import "./MessageAction.css"

const buttonClass = (direction = "none") => `message-action-button btn btn-primary ${direction}`

const DirectionalButton = ({ className = "", text = "", onClick = () => {} }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
)

const buttonText = direction => {
  switch (direction) {
    case "outbound":
      return "Compose"
    case "inbound":
      return "Reply"
    default:
      return "none"
  }
}

const MessageAction = ({ direction = "none", onClick = () => {} }) => {
  if (direction === "none") {
    return null
  } else {
    return <DirectionalButton className={buttonClass(direction)} text={buttonText(direction)} onClick={onClick} />
  }
}

export default MessageAction
