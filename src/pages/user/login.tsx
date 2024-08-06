import { Button, Input, Text, View } from '@tarojs/components';

import { HOME_ROUTE_PATH } from '@/constants/option';
import { cn } from '@/libs/util/basic';
import { showLoading, showToast } from '@/libs/taro/overlay';

import { useRoute, useRouter } from '@/hooks/router';
import { useForm } from '@/hooks/form';

import { withComposer } from '@/components/utility/compose';
import { FormController } from '@/components/utility/form';
import { Page } from '@/components/feature/page';
import { UserLoginGuarder } from '@/components/feature/user';

import { setupUserStore } from '@/stores/user/helper';

import { login } from '@/services/user';

import style from './login.module.css';

interface LoginRouteParams {
  from?: string;
}

function LoginView() {
  const router = useRouter();
  const { from, ...params } = useRoute<LoginRouteParams>().query;
  const { control, handleSubmit } = useForm({ defaultValues: { username: '' } });

  const handleLoginClick = handleSubmit((form) => {
    if (!form.username) {
      showToast('invalid username');
      return;
    }
    const closeLoading = showLoading('loading...');
    login(form.username)
      .then((res) => setupUserStore(res.token))
      .then(() => {
        closeLoading();
        router.replace({ path: decodeURIComponent(from || '') || HOME_ROUTE_PATH, query: params });
      })
      .catch((error) => {
        closeLoading();
        showToast(error?.message);
      });
  });

  return (
    <View className="pt-40">
      <View className="mx-auto p-4 w-9/12 rounded-xl border border-slate-200 bg-white shadow-xl">
        <View className="text-center">
          <View className="font-bold text-xl text-slate-800">Welcome</View>
          <View className="mt-2 text-sm text-slate-500">Enter your username to use the app.</View>
        </View>

        <View className="mt-5">
          <FormController control={control} name="username">
            {({ field: { value, onChange } }) => (
              <Input
                className={cn(
                  'border border-solid border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-center',
                  style.input,
                )}
                value={value}
                placeholder="Please enter your username"
                onInput={(e) => onChange(e.detail.value)}
              />
            )}
          </FormController>

          <Button
            className={(
              'mt-10 rounded-lg py-2 w-full h-max font-bold text-sm text-white bg-orange-500'
              + ' hover:bg-orange-400 focus:bg-orange-400 active:!bg-orange-400 active:!text-white'
            )}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </View>

        <View className="mt-3 text-center">
          <Text className="text-sm text-slate-400">
            taro-applet-boilerplate
          </Text>
        </View>
      </View>
    </View>
  );
}

const LoginRouteView = withComposer(
  <UserLoginGuarder expectation={false} />,
  <Page title="Login" />,
  LoginView,
);

export default LoginRouteView;
