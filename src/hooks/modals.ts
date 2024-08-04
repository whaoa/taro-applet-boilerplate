import { useContext } from 'react';

import { ModalManagerContext } from '@/libs/modals';

export function useModalManager() {
  const mm = useContext(ModalManagerContext);
  if (!mm) {
    throw new Error('useModalManager must be used within a ModalManagerProvider');
  }
  return mm;
}

export { useModal } from '@whaoa-libs/react-modal-manager';
