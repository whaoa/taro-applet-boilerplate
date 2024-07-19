import './styles/global.css';
import './styles/tailwind.css';
import { ReactQueryProvider } from './components/utility/query';

import type { PropsWithChildren } from 'react';

function App({ children }: PropsWithChildren<any>) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}

export default App;
