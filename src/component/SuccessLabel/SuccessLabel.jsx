const SuccessLabel = ({ text }) => {
  if (text !== null && text.length > 0) {
    return (
      <span className="label label-success" style={{ padding: ".5em", margin: ".5em 0em .5em 0em" }}>
        {text}
      </span>
    )
  }
  return null
}

export default SuccessLabel
