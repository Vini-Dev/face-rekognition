import { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Navigation from 'src/components/Navigation';
import Routes from 'src/routes';
import GlobalStyle from 'src/styles/GlobalStyle';

const App: FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Navigation />
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
