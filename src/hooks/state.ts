import { useCallback, useState } from 'react';

/**
 * Custom hook that manages a boolean toggle state in React components
 * @param initialValue
 */
export function useToggle(initialValue: boolean) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback((value?: typeof state) => (
    setState((current) => (typeof value === 'boolean' ? value : !current))
  ), []);

  return [state, toggle, setState] as const;
}
