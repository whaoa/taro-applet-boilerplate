import { useSystemStore } from '@/stores/system/store';

export function useNavigationLayout() {
  return useSystemStore((state) => state.navigation);
}

export function useSafeAreaInsets() {
  return useSystemStore((state) => state.safeAreaInsets);
}
