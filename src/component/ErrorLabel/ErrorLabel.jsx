import "./ErrorLabel.css"

export const ErrorLabel = ({ error }) => {
  const toString = () => {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}`
    }
    return `Error: ${String(error)}`
  }

  if (error) {
    return (
      <span className="label label-error error-label">
        {toString(error)}
      </span>
    )
  }

  return null
}

export default ErrorLabel
