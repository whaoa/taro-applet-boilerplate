import type { UserProfile } from '@/services/user';

interface UserStoreState {
  pending: boolean;
  user: UserProfile | null;
  token: string;
}

interface UserStoreAction {
  setPending: (pending: UserStoreState['pending']) => void;
  setUser: (user: UserStoreState['user'], token: UserStoreState['token']) => void;
}

export type IUserStore = UserStoreState & UserStoreAction;
