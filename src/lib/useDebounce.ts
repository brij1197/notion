import React from "react";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, SetDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      SetDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
