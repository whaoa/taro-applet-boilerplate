import { Button, Text, View } from '@tarojs/components';

import { useCallback } from 'react';

import { LOGIN_ROUTE_PATH } from '@/constants/option';
import { createModal } from '@/libs/modals';

import { useRouter } from '@/hooks/router';
import { useModal, useModalManager } from '@/hooks/modals';

import { Avatar } from '@/components/ui/image';
import { Modal } from '@/components/ui/modal';
import { Dialog, DialogAction, DialogFooter } from '@/components/ui/dialog';
import { withComposer } from '@/components/utility/compose';
import { ModalManagerProvider } from '@/components/utility/modals';
import { Page } from '@/components/feature/page';
import { UserLoginGuarder } from '@/components/feature/user';

import { useUserStore } from '@/stores/user/store';
import { cleanupUserStore } from '@/stores/user/helper';

const LogoutModal = createModal(() => {
  const router = useRouter();
  const { visible, close } = useModal();

  const handleLogoutClick = useCallback(() => {
    cleanupUserStore().then(() => router.replace({ path: LOGIN_ROUTE_PATH }));
  }, [router]);

  return (
    <Dialog title="Logout" visible={visible} onCancel={close} onConfirm={handleLogoutClick}>
      <View className="py-1 text-sm">Are you sure you want to logout?</View>
      <DialogFooter>
        <DialogAction type="cancel">Cancel</DialogAction>
        <DialogAction type="confirm">Logout</DialogAction>
      </DialogFooter>
    </Dialog>
  );
});

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

  const user = useUserStore((state) => state.user)!;

  const handleLogoutClick = useCallback(() => mm.open(LogoutModal), [mm]);

  const handleProjectNameClick = useCallback(() => mm.open(AboutModal), [mm]);

  return (
    <View className="pt-28">
      <View className="mx-auto p-4 w-9/12 rounded-xl border border-slate-200 bg-white shadow-xl">
        <View>
          <Avatar className="mx-auto" size={64} src={user.avatar} />
        </View>

        <View className="mt-2 font-bold text-xl text-center">
          <Text className="text-slate-800">👋 Hey, </Text>
          <Text className="text-slate-800">{user.username}</Text>
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

        <View>
          <Button
            className={(
              'mt-10 border border-solid border-slate-200 rounded-lg py-2 w-full h-max font-bold text-sm text-slate-500 bg-white'
              + ' hover:white focus:white active:!white active:!text-slate-800'
            )}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </View>

        <View className="mt-5 text-center">
          <Text className="text-sm text-slate-400" onClick={handleProjectNameClick}>
            taro-applet-boilerplate
          </Text>
        </View>
      </View>
    </View>
  );
}

const WelcomeRouteView = withComposer(
  <UserLoginGuarder expectation />,
  <Page title="Welcome" />,
  ModalManagerProvider,
  Welcome,
);

export default WelcomeRouteView;
