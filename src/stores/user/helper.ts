import { fetchUserProfile, logout } from '@/services/user';

import { USER_TOKEN_CACHE, userStorage } from './util';
import { useUserStore } from './store';

export async function cleanupUserStore() {
  const store = useUserStore.getState();
  if (store.token) {
    await logout();
  }
  store.setUser(null, '');
}

export async function setupUserStore(token: string) {
  const store = useUserStore.getState();
  store.setPending(true);
  try {
    const user = await fetchUserProfile(token);
    store.setUser(user, token);
  } finally {
    store.setPending(false);
  }
}

export async function initializeUserStore() {
  const token = userStorage.getItem(USER_TOKEN_CACHE);
  if (!token) {
    return;
  }
  await setupUserStore(token);
}
