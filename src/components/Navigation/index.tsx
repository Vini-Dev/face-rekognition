import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { Container } from './styles';

const Navigation: FC = () => {
  return (
    <Container>
      <NavLink to="/" exact>
        Real Time
      </NavLink>
      <NavLink to="/upload">Upload</NavLink>
    </Container>
  );
};

export default Navigation;
