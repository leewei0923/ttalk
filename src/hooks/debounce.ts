import { DependencyList, useCallback, useRef } from "react";


/**
 * 防抖 
 * @param func 
 * @param delay 
 * @param deps 
 * @returns 
 */
export default function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  deps: DependencyList = []
): [T, () => void] {
  const timer = useRef<number>();
  const cancel = useCallback(() => {
    if (timer.current != null) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback((...args: any) => {
    cancel();
    timer.current = window.setTimeout(() => {
      func(...args);
    }, delay);
  }, deps);
  return [run as T, cancel];
}
