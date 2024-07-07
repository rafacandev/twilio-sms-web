import { useCallback, useEffect, useRef } from "react"

/**
 * Custom React hook to determine if a component is currently mounted.
 *
 * This hook provides a function that returns the current mounted status of the component.
 * It can be used to avoid performing state updates on unmounted components, preventing
 * potential memory leaks and errors.
 *
 * @returns {function(): boolean} A callback function that returns `true` if the component
 * is currently mounted, and `false` otherwise.
 *
 * @example
 * const isMounted = useIsMounted();
 *
  // simulate an api call and update state
  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) setData('OK')
    })
  }, [isMounted])
 */
export const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
