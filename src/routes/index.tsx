import { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from 'src/pages/Home';
import Upload from 'src/pages/Upload';

const Routes: FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/upload" component={Upload} />
    </Switch>
  );
};

export default Routes;
