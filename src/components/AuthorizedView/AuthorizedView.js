import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/core';

import Header from '../Header';
import Room from '../Room/Room';
import NotFound from '../NotFound/NotFound';

function AuthorizedView() {
  return (
    <>
      <Box maxW="100vw" p={4} color="white">
        <Header />
      </Box>
      <Switch>
        <Route path="/" exact children={<Room />} />
        <Route path="/404" exact children={<NotFound />} />
        <Route path="/:id" exact children={<Room />} />
        <Route Route path="*" children={<NotFound />} />
      </Switch>
    </>
  )
};

export default AuthorizedView;