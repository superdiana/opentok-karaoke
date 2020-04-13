import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../Header';
import App from './App';
import { Box, Flex } from '@chakra-ui/core';

function AppWrapper() {
  return (
    <Flex direction="column" h="100vh">
      <Box bg="gray.800" maxW="100vw" p={4} color="white">
        <Header />
      </Box>
      <Switch>
        <Route path="/:id" children={<App />} />
        <Route Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </Flex>
  )
};


export default AppWrapper;
