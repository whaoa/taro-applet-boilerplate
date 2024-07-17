import { useEffect, useLayoutEffect } from 'react';

import { IS_WEB_PLATFORM } from '@/constants/taro';

/**
 * Custom hook that uses either useLayoutEffect or useEffect based on the environment.
 * - In non-web environments, useLayoutEffect may not be available
 * - In SSR mode, both useLayoutEffect and useEffect are executed only on the client.
 *   But if you use useLayoutEffect on the server, you will get a warning: https://fb.me/react-uselayouteffect-ssr.
 */
export const useIsomorphicLayoutEffect = (IS_WEB_PLATFORM && typeof window !== 'undefined')
  ? useLayoutEffect
  : useEffect;
