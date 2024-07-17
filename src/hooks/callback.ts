import { useCallback, useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './react';

/**
 * Custom hook that handles timeouts in React components using the setTimeout API
 * @param callback
 * @param delay
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const latestRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    latestRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Don't schedule if no delay is specified (Note: 0 is a valid value for delay)
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => {
      latestRef.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
}

/**
 * Custom hook that creates an interval that invokes a callback function at a specified delay
 * using the setInterval API
 * @param callback
 * @param delay
 */
export function useInterval(callback: () => void, delay: number | null) {
  const latestRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    latestRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Don't schedule if no delay is specified (Note: 0 is a valid value for delay)
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      latestRef.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

function shouldNotBeInvokedBeforeMount() {
  throw new Error(
    'the event callback function cannot be invoked before the component has mounted.',
  );
}

/**
 * Similar to useCallback, with a few subtle differences:
 * - The returned function is a stable reference, and will always be the same between renders
 * - No dependency lists required
 * - Properties or state accessed within the callback will always be "current"
 * @see https://foxact.skk.moe/use-stable-handler-only-when-you-know-what-you-are-doing-or-you-will-be-fired
 */
export function useEventCallback<Args extends any[], Result>(
  callback: (...args: Args) => Result,
): typeof callback {
  const latestRef = useRef<typeof callback>(shouldNotBeInvokedBeforeMount as any);

  useIsomorphicLayoutEffect(() => {
    latestRef.current = callback;
  }, [callback]);

  return useCallback<typeof callback>((...args) => latestRef.current(...args), []);
}
