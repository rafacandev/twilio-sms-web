import { CloseCircleFilled } from "@ant-design/icons"
import axios from "axios"

const toString = error => {
  if (axios.isAxiosError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`
  }
  return `Error: ${String(error)}`
}

export const ErrorLabel = ({ error, className = "" }) => {
  if (error) {
    return (
      <div className={`bg-red-100 border-red-800 border p-2 rounded ${className}`}>
        <CloseCircleFilled className="text-red-500 mr-2 text-2xl inline-block" />
        <span className="inline-block">{toString(error)}</span>
      </div>
    )
  }

  return null
}
