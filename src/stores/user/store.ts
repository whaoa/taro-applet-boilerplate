import { create } from 'zustand';

import { USER_TOKEN_CACHE, userStorage } from './util';

import type { IUserStore } from './type';

export const useUserStore = create<IUserStore>((set) => ({
  pending: false,
  user: null,
  token: '',

  setPending(pending) {
    set({ pending: !!pending });
  },

  setUser(user, token) {
    if (user && !token) {
      return;
    }
    set({ user, token });
    if (token) {
      userStorage.setItem(USER_TOKEN_CACHE, token);
    } else {
      userStorage.removeItem(USER_TOKEN_CACHE);
    }
  },
}));
