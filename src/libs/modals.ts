import { createContext } from 'react';

import type { ModalManager } from '@whaoa-libs/react-modal-manager';

export const ModalManagerContext = createContext<ModalManager | null>(null);

export { createModal, createModalManager } from '@whaoa-libs/react-modal-manager';
