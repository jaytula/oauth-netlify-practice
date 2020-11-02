import { useEffect } from "react";

export const useInterval = (callback: Function, timeout: number) => {
  useEffect(() => {
    const interval = setInterval(callback, timeout);
    return () => {
      clearInterval(interval);
    }
  })
}