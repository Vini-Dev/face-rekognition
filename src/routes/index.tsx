import { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from 'src/pages/Home';

const Routes: FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
