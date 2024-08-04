import { View } from '@tarojs/components';

import { useState } from 'react';
import { ModalStackPlacement } from '@whaoa-libs/react-modal-manager';

import { ModalManagerContext, createModalManager } from '@/libs/modals';

import type { PropsWithChildren } from 'react';

export function ModalManagerProvider(props: PropsWithChildren) {
  const { children } = props;
  const [modalManager] = useState(createModalManager);
  return (
    <ModalManagerContext.Provider value={modalManager}>
      {children}
      <View>
        <ModalStackPlacement modalManager={modalManager} />
      </View>
    </ModalManagerContext.Provider>
  );
}

export { ModalController } from '@whaoa-libs/react-modal-manager';
