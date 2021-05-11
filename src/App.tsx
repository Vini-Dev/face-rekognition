import { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from 'src/routes';
import GlobalStyle from 'src/styles/GlobalStyle';

const App: FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
