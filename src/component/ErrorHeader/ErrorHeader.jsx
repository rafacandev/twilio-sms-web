const ErrorHeader = ({error}) => {
  const toString = () => {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}`
    }
    return String(error)
  }

  if (error) {
    return <div>{toString(error)}</div>
  }

  return null
}

export default ErrorHeader