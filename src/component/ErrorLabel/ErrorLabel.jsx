const ErrorLabel = ({ error }) => {
  const toString = () => {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}`
    }
    return `Error: ${String(error)}`
  }

  if (error) {
    return (
      <span className="label label-error" style={{ padding: ".5em", margin: ".5em 0em .5em 0em" }}>
        {toString(error)}
      </span>
    )
  }

  return null
}

export default ErrorLabel
