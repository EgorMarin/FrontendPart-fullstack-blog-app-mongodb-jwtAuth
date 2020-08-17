import { useCallback } from "react"

export const useMessage = () => {
  return useCallback((message) => {
    window.M.toast({html: message})
  }, [])
}