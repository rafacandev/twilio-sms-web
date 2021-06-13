const LoadingHeader = ({loading = false}) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return null
}

export default LoadingHeader