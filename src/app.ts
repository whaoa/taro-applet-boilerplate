import './styles/global.css';
import './styles/tailwind.css';

import type { PropsWithChildren } from 'react';

function App({ children }: PropsWithChildren<any>) {
  return children;
}

export default App;
