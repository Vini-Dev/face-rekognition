import { FC } from 'react';

import Home from 'src/pages/Home';
import GlobalStyle from 'src/styles/GlobalStyle';

const App: FC = () => (
  <>
    <GlobalStyle />
    <Home />
  </>
);

export default App;
