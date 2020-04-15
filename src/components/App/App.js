import React from 'react';
import Login from '../Login';
import Loading from '../Loading';
import AuthorizedView from '../AuthorizedView';
import { Flex } from '@chakra-ui/core';
import { useAuth } from '../../contexts/firebase';

function renderSwitch(u, i, e) {
  if (i) return <Loading />;
  if (e) return <Login error={e} />;
  if (u) return <AuthorizedView />;
  return <Login />;
}

function App() {
  const { user, initializing, error } = useAuth();

  return (
    <Flex
      direction="column"
      h="100vh"
      overflow={'hidden'}
      backgroundImage="url('/images/login-background.jpg')"
      backgroundSize="cover"
    >
      {renderSwitch(user, initializing, error)}
    </Flex>
  )
};

export default App;
