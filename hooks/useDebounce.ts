import { useEffect, useState } from "react";

/**
 * A hook that debounces a value and executes a callback after the debounce delay
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @param callback Optional callback function to execute after debounce
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
