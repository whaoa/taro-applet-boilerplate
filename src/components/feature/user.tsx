import { useEffect, useRef } from 'react';

import { HOME_ROUTE_PATH, LOGIN_ROUTE_PATH } from '@/constants/option';
import { useRoute, useRouter } from '@/hooks/router';
import { useUserStore } from '@/stores/user/store';

import type { PropsWithChildren } from 'react';

function useUserLoginState() {
  const store = useUserStore();
  if (store.pending) {
    return null;
  }
  return !!store.token;
}

export interface UserLoginGuarderProps extends PropsWithChildren {
  expectation: boolean;
}

export function UserLoginGuarder(props: UserLoginGuarderProps) {
  const { children, expectation } = props;

  const route = useRoute();
  const router = useRouter();

  const state = useUserLoginState();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || state === null) {
      return;
    }
    if (state !== expectation) {
      if (expectation) {
        router.replace({ path: LOGIN_ROUTE_PATH, query: { ...route.query, from: route.path } });
      } else {
        const isLoginRoute = route.path === HOME_ROUTE_PATH;
        const routePath = isLoginRoute ? decodeURIComponent(route.query.from || '') : HOME_ROUTE_PATH;
        const queryParams = isLoginRoute ? { ...route.query, from: undefined } : route.query;
        router.replace({ path: routePath || HOME_ROUTE_PATH, query: queryParams });
      }
    }
    initializedRef.current = true;
  }, [router, expectation, state, route]);

  if (state === null || state !== expectation) {
    return null;
  }

  return children;
}
