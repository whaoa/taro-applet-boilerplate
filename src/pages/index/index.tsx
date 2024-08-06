import { Text, View } from '@tarojs/components';

import { useCallback } from 'react';

import { createModal } from '@/libs/modals';
import { useModal, useModalManager } from '@/hooks/modals';
import { Modal } from '@/components/ui/modal';
import { withComposer } from '@/components/utility/compose';
import { ModalManagerProvider } from '@/components/utility/modals';
import { Page } from '@/components/feature/page';

const AboutModal = createModal(() => {
  const { visible, close } = useModal();

  return (
    <Modal title="About" visible={visible} onClose={close}>
      <View className="py-1 text-sm">
        <Text className="font-bold mr-2">Name:</Text>
        <Text>taro-applet-boilerplate</Text>
      </View>
      <View className="py-1 text-sm">
        <Text className="font-bold mr-2">Author:</Text>
        <Text>whaoa</Text>
      </View>
      <View className="py-1 text-sm">
        <Text className="font-bold mr-2">License:</Text>
        <Text>MIT</Text>
      </View>
      <View className="py-1 text-sm">
        <Text className="font-bold mr-2">Github:</Text>
        <Text>whaoa/taro-applet-boilerplate</Text>
      </View>
    </Modal>
  );
});

function Welcome() {
  const mm = useModalManager();

  const handleProjectNameClick = useCallback(() => mm.open(AboutModal), [mm]);

  return (
    <View className="mt-40 mx-auto py-3 px-3 w-9/12 rounded-xl border border-slate-300 bg-white shadow-xl">
      <View className="font-bold text-xl text-center">
        <Text className="text-slate-800">👋 Hey,</Text>
      </View>

      <View className="font-bold text-xl text-center">
        <Text className="text-orange-400">Nice</Text>
        <Text className="text-slate-800"> to meet you!</Text>
      </View>

      <View className="mt-4 text-base text-center text-slate-600">
        <Text>{'Let\'s start this new project with '}</Text>
        <Text style={{ color: '#3578e5' }}>Taro</Text>
        <Text> and </Text>
        <Text style={{ color: '#149eca' }}>React</Text>
        <Text>.</Text>
      </View>

      <View className="mt-5 text-center">
        <Text className="text-sm text-slate-400" onClick={handleProjectNameClick}>
          taro-applet-boilerplate
        </Text>
      </View>
    </View>
  );
}

const IndexView = withComposer(
  ModalManagerProvider,
  <Page title="Welcome" />,
  Welcome,
);

export default IndexView;
