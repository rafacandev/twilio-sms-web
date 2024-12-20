import { emptyFn } from "../../js/types"
import "./ErrorLabel.css"

const toString = error => {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`
  }
  return `Error: ${String(error)}`
}
export const ErrorLabel = ({ error, className, onClose = emptyFn }) => {
  if (error) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div
          id="toast-danger"
          class="flex items-center w-full max-w-sm p-4 mb-4 bg-red-50 rounded-lg shadow-sm border-red-300 border"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500 bg-red-100 rounded-lg">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          </div>
          <div class="ms-3">{toString(error)}</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-red-100 text-red-400 hover:text-red-900 rounded-lg focus:ring-2 focus:ring-red-300 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-6 w-6 border-0"
            onClick={onClose}
            data-dismiss-target="#toast-danger"
            aria-label="Close"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return null
}
