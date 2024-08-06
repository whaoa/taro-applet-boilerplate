import { useLaunch } from '@tarojs/taro';

import './styles/global.css';
import './styles/tailwind.css';
import { ReactQueryProvider } from './components/utility/query';
import { initializeUserStore } from './stores/user/helper';

import type { PropsWithChildren } from 'react';

function handleAppLaunch() {
  initializeUserStore();
}

function App({ children }: PropsWithChildren<any>) {
  useLaunch(handleAppLaunch);

  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}

export default App;
